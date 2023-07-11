import React from "react";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";
import Footer from "../Footer/Footer";
import "./App.css";

export default class App extends React.Component {
  taskId = 1;

  constructor(props) {
    super(props);
    this.state = {
      toDoData: [],
    };
  }

  deleteTask = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      toDoData.splice(idx, 1);
      const before = toDoData.slice(0, idx);
      const after = toDoData.slice(idx);
      const newArr = [...before, ...after];
      return {
        toDoData: newArr,
      };
    });
  };

  addTask = (text, time) => {
    let newTask;
    if (text.split("").length !== 0 && text.split("")[0] !== " " && time) {
      newTask = this.createToDoItem(text, time);
      this.setState(({ toDoData }) => {
        const newArr = [...toDoData, newTask];
        return {
          toDoData: newArr,
        };
      });
    }
  };

  onToggleCompleted = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldTask = toDoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const before = toDoData.slice(0, idx);
      const after = toDoData.slice(idx + 1);
      const newArr = [...before, newTask, ...after];
      return {
        toDoData: newArr,
      };
    });
  };

  onToggleEdited = (id, text) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id);
      const oldTask = toDoData[idx];
      const newTask = {
        ...oldTask,
        edited: !oldTask.edited,
        label: text,
      };
      const before = toDoData.slice(0, idx);
      const after = toDoData.slice(idx + 1);
      const newArr = [...before, newTask, ...after];
      if (!oldTask.completed)
        return {
          toDoData: newArr,
        };
    });
  };

  statusFilter = (text) => {
    if (text === "completed") {
      this.setState(({ toDoData }) => {
        for (const el of toDoData) {
          if (el.completed === false) {
            el.vision = false;
          } else el.vision = true;
        }
        return {
          toDoData: this.state.toDoData,
        };
      });
    }
    if (text === "all") {
      this.setState(({ toDoData }) => {
        for (const el of toDoData) {
          if (el.vision === false) {
            el.vision = true;
          }
        }
        return {
          toDoData: this.state.toDoData,
        };
      });
    }
    if (text === "active") {
      this.setState(({ toDoData }) => {
        for (const el of toDoData) {
          if (el.completed === true) {
            el.vision = false;
          } else el.vision = true;
        }
        return {
          toDoData: this.state.toDoData,
        };
      });
    }
  };

  clearCompleted = () => {
    this.setState(({ toDoData }) => {
      const arrId = [];
      for (const el of toDoData) {
        if (el.completed === true) {
          arrId.push(el.id);
        }
      }
      for (const el of arrId) {
        this.deleteTask(el);
      }
    });
  };

  timeToTask = (arr, id) => {
    const { toDoData } = this.state;
    const idx = toDoData.findIndex((el) => el.id === id);
    const task = toDoData[idx];
    task.timer = arr;
    this.setState({ toDoData });
  };

  createToDoItem(label, taskTime) {
    return {
      label,
      completed: false,
      edited: false,
      id: this.taskId++,
      vision: true,
      date: new Date(),
      time: taskTime,
      timer: [0, 0, 0],
    };
  }

  render() {
    const completedCount = this.state.toDoData.filter(
      (el) => el.completed === false
    ).length;

    return (
      <div className="ToDoApp">
        <ToDoForm onAdd={this.addTask} />
        <ToDoList
          todos={this.state.toDoData}
          onDeleted={this.deleteTask}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEdited={this.onToggleEdited}
          timeToTask={this.timeToTask}
        />
        <Footer
          completedCount={completedCount}
          statusFilter={this.statusFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}
