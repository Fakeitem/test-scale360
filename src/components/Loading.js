import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Loading extends Component {
  render() {
    return (
      <div className="single-page">
        <h1>
            <span className="d-inline-block">Welcome </span>
            <span className="my-loading d-inline-block ml-3 mr-3">
                <FontAwesomeIcon icon={['fas', 'spinner']} size="1x" color="#007bff" />
            </span>
            <span className="d-inline-block">TODO Task</span>
        </h1>
      </div>
    )
  }
}

export default Loading;