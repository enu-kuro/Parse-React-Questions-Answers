'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var AnswerListItem = React.createClass({

  propTypes: {
    answer: ReactPropTypes.object
  },

  render: function() {
    var answer = this.props.answer;
    return (
      <div className="answerList">
        <p> {answer.name} </p><hr/>
        <p> {answer.message}</p>
        <p className="data">{answer.spentTimeText}</p>
      </div>
    );
  }

});

module.exports = AnswerListItem;
