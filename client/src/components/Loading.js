import React from 'react';

function Loading({ text }) {
  return (
    <div id="loading">
      <div className="content">
        <i className="fas fa-circle-notch"></i>
        <p>{text}</p>
      </div>
    </div>
  );
}
Loading.defaultProps = { text: 'Please wait' };

export default Loading;
