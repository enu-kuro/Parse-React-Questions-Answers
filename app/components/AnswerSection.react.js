'use strict';

var React = require('react');
var QuestionStore = require('../stores/QuestionStore');
var AnswerStore = require('../stores/AnswerStore');
var ActionCreators = require('../actions/ActionCreators');
var MessageComposer = require('./MessageComposer.react');
var AnswerListItem = require('./AnswerListItem.react');
var AuthCheckMixin = require('./AuthCheckMixin.react');

var Router = require('react-router');
var { Link } = Router;

function getStateFromStores() {
  return {
    answers: AnswerStore.getAnswers(),
    question: QuestionStore.getCurrentQuestion()
  };
}

function getAnswerListItem(answer) {

  return (
    <AnswerListItem
      key={answer.id}
      answer={answer}
    />
  );
}

var AnswerSection = React.createClass({
  mixins: [AuthCheckMixin],

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AnswerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AnswerStore.removeChangeListener(this._onChange);
  },

  render: function() {

    if (!this.state.question) {return <div><Link to="/">Back</Link></div>};

    var AnswerListItems = this.state.answers.map(getAnswerListItem);
    return (
      <div className="answerSection">
      <Link to="/">
        <button className="btn btn-default btn-sm">Back</button>
      </Link>
      <div className="question">
        <p>{this.state.question.name} </p>
        <hr/>
        <p>{this.state.question.message}</p>
        <p className="data">{this.state.question.spentTimeText}</p>
      </div>
      <hr/>{AnswerListItems}
      <MessageComposer submit={this.submitAnswer} />
    </div>
    );
  },

  submitAnswer: function(message){
    ActionCreators.createAnswer(message, this.state.question.id);
  },

  /**
   * Event handler for 'change' events coming from the AnswerStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = AnswerSection;
