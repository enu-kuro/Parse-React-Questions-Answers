'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var WebAPIUtils = require('../utils/WebAPIUtils');
var AppUtils = require('../utils/AppUtils');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentQuestionId = null;
var _questions = [];
var _isLoading = false

var QuestionStore = objectAssign({},EventEmitter.prototype, {

    init: function(questions){
      var tempQuestionsArray = [];
      questions.forEach(function(question) {
        var questionId = question.id
        var message = question.get('message');
        var name = question.get('user').get('username');
        var createdAt = question.createdAt;
        var spentTimeText = AppUtils.generateSpentTimeText(createdAt);

        tempQuestionsArray.push({
          id: questionId,
          name: name,
          message: message,
          spentTimeText: spentTimeText
        });
      });
      _questions = tempQuestionsArray;
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    getQuestions: function(){
      return _questions;
    },

    getCurrentQuestion: function() {
       var currentQuesion = _questions.filter(function(question){
        return question.id === _currentQuestionId;
      })[0];

      return currentQuesion
    },

    isLoading: function(){
      return _isLoading;
    }

});

function _showTopics() {
  WebAPIUtils.getTopics().then(function(topics) {
    ActionCreators.receiveTopics(topics);
  }, function(error) {
    console.log(error);
  });
}

function updateQuestions(){

  WebAPIUtils.getQuestions().then(function(questions) {

    QuestionStore.init(questions);
    console.log(questions);
    QuestionStore.emitChange();

  }, function(error) {
    console.log(error);
  });

}

QuestionStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.LOGOUT:
      _questions = [];
    break;

    case ActionTypes.CREATE_QUESTION:
    break;

    case ActionTypes.UPDATE_QUESTION_LIST:
      _questions = [];
      _isLoading = true;
      QuestionStore.emitChange();
    break;

    case ActionTypes.RECEIVE_QUESTION_LIST:
      QuestionStore.init(action.questions);
      _isLoading = false;
      QuestionStore.emitChange();
    break;

    case ActionTypes.RECEIVE_QUESTION:
      _currentQuestionId = action.question[0].id;
      QuestionStore.init(action.question);
      _isLoading = false;
    break;

    case ActionTypes.UPDATE_ANSWER_LIST:
      _currentQuestionId = action.questionId;
    break;

    case ActionTypes.RECEIVE_QUESTION:
      QuestionStore.init(action.question);
    break;

    default:

  }

});

module.exports = QuestionStore;
