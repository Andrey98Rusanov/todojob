import React from "react";
import PropTypes from "prop-types";
import Filters from "../Filters/Filters";
import "./Footer.css";

function Footer({ completedCount, statusFilter, clearCompleted }) {
  return (
    <div className="Footer">
      <span>{completedCount} items left</span>
      <Filters statusFilter={statusFilter} />
      <button onClick={clearCompleted}>Clear completed</button>
    </div>
  );
}

Footer.defaultProps = {
  completedCount: 0,
  statusFilter: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  completedCount: PropTypes.number,
  statusFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
