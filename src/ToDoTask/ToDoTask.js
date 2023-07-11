import React, { useState, useEffect} from "react";
import "./ToDoTask.css";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

function ToDoTask ({ toDoData, id,  completed, edited, date, ...props  }) {

  const [label, setLabel] = useState(props.label)
  const [minutes, setMinutes] = useState(props.toDoData[findTimerId()].timer[1])
  const [seconds, setSeconds] = useState(props.toDoData[findTimerId()].timer[2])
  const [pause, setPause] = useState(false)

  useEffect(() => {
    document.addEventListener(
      "click",
      handleClickOutside,
      true
    );
    document.addEventListener(
      "keydown",
      handleClickOutside,
      true
    );
    const myInterval = setInterval(() => {
      if (pause !== true) {
        props.timeToTask([ minutes, seconds]);
        setSeconds((seconds) => ({
          seconds: seconds + 1
        }))
      }
      if (seconds === 59) {
        setMinutes((minutes) => ({
          minutes: minutes + 1
        }))
      }
    }, 1000);
    return () => document.removeEventListener(
      "click",
      handleClickOutside,
      true
    ),
    clearInterval(myInterval);
  }, [])

  function handleClickOutside(event) {
    const domNode = document.querySelector(".edited");
    if (domNode) {
      if (!domNode.contains(event.target) && props.edited) {
        setLabel(props.label)
        props.onToggleEdited(props.label);
      }
      if (event.key === "Escape" && props.edited) {
        setLabel(props.label)
        props.onToggleEdited(props.label);
      }
    }
  }

  function onStopClick() {
    setPause((pause) => ({
      pause: !pause
    }))
  }

  function onRestartClick() {
    setMinutes(0)
    setSeconds(0)
  }

  const onChange = (e) => {
    setLabel(e.target.value)
  };

  function timeOff() {
    const arr = props.time.split(":");
    const res = Number(arr[0]) * 60 + Number(arr[1]);
    if (res === minutes * 60 + seconds && pause === false) {
      props.timeToTask([ minutes, seconds]);
      setPause(true)
    }
    return res;
  }

  function findTimerId() {
    const { toDoData, id } = props;
    const idx = toDoData.findIndex((el) => el.id === id);
    return idx;
  }

    let className = "item";
    if (completed) {
      className += " completed";
    }
    if (edited)
      return (
        <form className="edited">
          <button
            className="bi bi-check-lg"
            onClick={props.onToggleEdited}
          />
          <input
            className="edited__input"
            value={label}
            onChange={onChange}
            autoFocus
          />
        </form>
      );

    const startClass = pause ? "bi bi-skip-start" : "bi bi-stop-fill";
    const timeLimit =
      minutes * 60 + seconds === timeOff() ? (
        "time off"
      ) : (
        <span>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );

    return (
      <div className="task">
        <div className={className}>
          <input type="checkbox" onClick={props.onToggleCompleted} />
          <div className="text">{label}</div>
        </div>
        <div className="Timer">
          {timeLimit}
          {timeLimit === "time off" ? null : (
            <button className={startClass} onClick={() => onStopClick()} />
          )}
          <button
            className="bi bi-arrow-repeat"
            onClick={() => onRestartClick()}
          />
        </div>
        <span className="task__time">
          {`${formatDistanceToNow(date, {
            includeSeconds: true
          })}`}
        </span>
        <div className="task__btn">
          <button
            className="bi bi-pencil-fill"
            onClick={() => props.onToggleEdited(label)}
          />
          <button
            className="bi bi-trash3-fill"
            onClick={props.onDeleted}
          />
        </div>
      </div>
    );
  }

  export default ToDoTask

ToDoTask.defaultProps = {
  completed: false,
  edited: false,
  date: new Date(),
  label: "hey!",
  onToggleCompleted: () => {},
  onToggleEdited: () => {},
  onDeleted: () => {},
  toDoData: [],
  id: 0,
  timeToTask: () => {},
  time: "00:00",
};

ToDoTask.propTypes = {
  completed: PropTypes.bool,
  edited: PropTypes.bool,
  label: PropTypes.string,
  date: PropTypes.any,
  onToggleCompleted: PropTypes.func,
  onToggleEdited: PropTypes.func,
  onDeleted: PropTypes.func,
  toDoData: PropTypes.array,
  id: PropTypes.number,
  timeToTask: PropTypes.func,
  time: PropTypes.string,
};
