'use strict';

var React = require('react');

var MessageComposer = React.createClass({

  propTypes: {
    submit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {text: ''};
  },

  render: function() {
    return (
      <div className="messageComposer">
        <div className="form-group">
          <textarea className="form-control" rows="3" value={this.state.text} onChange={this._onChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={this._onClick}>Submit</button>
        </div>
      </div>
    );
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onClick: function(event, value) {
    if (this.state.text) {
      this.props.submit(this.state.text);
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;
