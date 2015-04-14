'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ActionTypes = AppConstants.ActionTypes;
var QuestionStore = require('../stores/QuestionStore');

var ActionCreators = {

  logout: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.LOGOUT
    });
  },

  createQuestion: function(message) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_QUESTION,
      message: message
    });
    createQuestion(message);
  },

  updateQuestions: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_QUESTIONS,
    });
  },

  showAnswerList: function(answerId) {
    AppDispatcher.dispatch({
      type: ActionTypes.SHOW_ANSWER_LIST,
      answerId: answerId
    });
  },
  updateQuestionList: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_QUESTION_LIST
    });
    getQuestions();
  },

  receiveQuestionList: function(questions) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_QUESTION_LIST,
      questions: questions
    });
  },

  receiveQuestion: function(question) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_QUESTION,
      question: question
    });
  },

  updateQuestionsFailed: function(error) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_QUESTIONS_FAILED,
      error: error
    });
  },

  updateAnswerList: function(questionId) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_ANSWER_LIST,
      questionId: questionId
    });
    getAnswers(questionId);
  },

  receiveAnswerList: function(answers) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ANSWER_LIST,
      answers: answers
    });
  },

  updateAnswersFailed: function(error) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_ANSWERS_FAILED,
      error: error
    });
  },

  createAnswer: function(message, questionId) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_ANSWER,
      message: message,
      questionId: questionId
    });
    createAnswer(message, questionId)
  }


};

function createQuestion(message){

  WebAPIUtils.createQuestion(message).then(function() {
    getQuestions();
  }, function(error) {
    console.log(error);
    //ActionCreators.updateQuestionsFailed(error);
  });
}

function createAnswer(message, questionId){

  WebAPIUtils.createAnswer(message, questionId).then(function() {
    getAnswers(questionId);
  }, function(error) {
    console.log(error);
    //ActionCreators.updateQuestionsFailed(error);
  });
}

function getQuestions(){

  WebAPIUtils.getQuestions().then(function(questions) {
    ActionCreators.receiveQuestionList(questions);
  }, function(error) {
    console.log(error);
    ActionCreators.updateQuestionsFailed(error);
  });

}

function getAnswers(questionId) {

  if (!QuestionStore.getCurrentQuestion()){
    WebAPIUtils.getQuestion(questionId).then(function(question) {
      ActionCreators.receiveQuestion(question);
    }, function(error) {
      console.log(error);
      ActionCreators.updateAnswersFailed(error);
    });
  }

  WebAPIUtils.getAnswers(questionId).then(function(answers) {
    ActionCreators.receiveAnswerList(answers);
  }, function(error) {
    console.log(error);
    ActionCreators.updateAnswersFailed(error);
  });
}
module.exports = ActionCreators;
