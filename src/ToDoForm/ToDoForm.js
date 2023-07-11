import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ToDoForm.css";

function ToDoForm (props) {

  const [label, setLabel] = useState("")
  const [time, setTime] = useState("00:00")

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  };

  const onTimeChange = (e) => {
    setTime(e.target.value)
  };


  const onSubmit = (e) => {
    e.preventDefault();
    props.onAdd(label, time);
    setLabel("")
    setTime("00:00")
  };

    return (
      <header className="ToDoForm">
        <h1 className="ToDo__title">
          <i className="bi bi-check2-circle" />
          ToDo
        </h1>
        <form className="add__form" onSubmit={onSubmit}>
          <input
            className="add__form-input"
            placeholder="What needs to be done?"
            autoFocus
            value={label}
            onChange={onLabelChange}
          />
          <input
            type="time"
            min="00:01"
            value={time}
            className="addTime"
            placeholder="hh:mm"
            onChange={onTimeChange}/>
            <button className="time_button" type="submit"/>
        </form>
      </header>
    );
}

export default ToDoForm

ToDoForm.defaultProps = {
  onAdd: () => {},
};

ToDoForm.propTypes = {
  onAdd: PropTypes.func,
};
