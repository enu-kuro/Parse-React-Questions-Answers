'use strict';

var React = require('react');
var ActionCreators = require('../actions/ActionCreators');
var ReactPropTypes = React.PropTypes;

var QuestionListItem = React.createClass({

  propTypes: {
    question: ReactPropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var question = this.props.question;
    return (
      <div className="questionList" id="clickArea" onClick={this._onClick}>
        <p> {question.name} </p><hr/>
        <p> {question.message}</p>
        <p className="data">{question.spentTimeText}</p>
      </div>
    );
  },

  _onClick: function() {
    ActionCreators.updateAnswerList(this.props.question.id);
    this.context.router.transitionTo('/answer/:id', {id:this.props.question.id}, {});
  }

});

module.exports = QuestionListItem;
