'use strict';

var React = require('react');
var QuestionListItem = require('../components/QuestionListItem.react');
var QuestionStore = require('../stores/QuestionStore');
var MessageComposer = require('./MessageComposer.react');
var ActionCreators = require('../actions/ActionCreators');
var AuthCheckMixin = require('./AuthCheckMixin.react');

function getStateFromStores() {
  return {
    questions: QuestionStore.getQuestions(),
    loading: QuestionStore.isLoading()
  };
}

var QuestionSection = React.createClass({
  mixins: [AuthCheckMixin],

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var questionListItems = this.state.questions.map(function(question) {
      return (
        <QuestionListItem
          key={question.id}
          question={question}
        />
      );
    }, this);

    return (
      <div className="questionSection">
        <MessageComposer submit={this.submitQuestion} />
        <div className="q-list">
          {this.state.loading ? <i>Loading...</i>: ''}
          <ul>{questionListItems}</ul>
        </div>
      </div>
    );
  },

  submitQuestion: function(message) {
    ActionCreators.createQuestion(message);
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = QuestionSection;
