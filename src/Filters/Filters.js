import React from "react";
import PropTypes from "prop-types";

export default class Filters extends React.Component {
  render() {
    return (
      <div className="filters">
        <button onClick={() => this.props.statusFilter("all")}>All</button>
        <button onClick={() => this.props.statusFilter("active")}>
          Active
        </button>
        <button onClick={() => this.props.statusFilter("completed")}>
          Completed
        </button>
      </div>
    );
  }
}

Filters.defaultProps = {
  statusFilter: () => {},
};

Filters.propTypes = {
  statusFilter: PropTypes.func,
};
