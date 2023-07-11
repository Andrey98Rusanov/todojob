import React from "react";
import PropTypes from "prop-types";
import ToDoTask from "../ToDoTask/ToDoTask";
import "./ToDoList.css";

function ToDoList({ todos, onDeleted, onToggleCompleted, onToggleEdited, timeToTask }) {
  const elements = todos.map((el) => {
    const { id, vision, ...items } = el;
    let className = "list-group-item";
    if (vision === false) className += " none";
    return (
      <li key={id} className={className}>
        <ToDoTask
          {...items}
          id = {id}
          toDoData = {todos}
          timeToTask={(n) => timeToTask(n, id)}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEdited={(label) => onToggleEdited(id, label)}
        />
      </li>
    );
  });

  return <ul className="list-group">{elements}</ul>;
}

ToDoList.defaultProps = {
  todos: [],
  onToggleCompleted: () => {},
  onToggleEdited: () => {},
  onDeleted: () => {},
  timeToTask: () => {}
};

ToDoList.propTypes = {
  todos: PropTypes.array,
  onToggleCompleted: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  timeToTask: PropTypes.func
};

export default ToDoList;
