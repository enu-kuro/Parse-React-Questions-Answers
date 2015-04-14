'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var QuestionStore = require('../stores/QuestionStore');
var objectAssign = require('react/lib/Object.assign');
var WebAPIUtils = require('../utils/WebAPIUtils');
var AppUtils = require('../utils/AppUtils');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _answers = [];
var _isLoading = false

var AnswerStore = objectAssign({},EventEmitter.prototype, {

  init: function(answers){
    var tempAnswersArray = [];
    answers.forEach(function(answer) {

      var id = answer.id;
      var message = answer.get('message');
      var name = answer.get('user').get('username');
      var createdAt = answer.createdAt;
      var spentTimeText = AppUtils.generateSpentTimeText(createdAt);

      tempAnswersArray.push({
        id: id,
        name: name,
        message: message,
        spentTimeText: spentTimeText
      });
    });
    _answers = tempAnswersArray;
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

  getAnswers: function(){
    return _answers;
  },

  isLoading: function(){
    return _isLoading;
  }

});

function updateAnswers(questionId) {

  WebAPIUtils.getAnswersWithQuestionId(questionId).then(function(questions) {
    AnswerStore.init(questions);
    AnswerStore.emitChange();
  }, function(error) {
    console.log(error);
  });

}

AnswerStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE_ANSWER:
    break;

    case ActionTypes.SHOW_ANSWER_LIST:
      AppDispatcher.waitFor([QuestionStore.dispatchToken]);
      updateAnswers(action.questionId);
    break;

    case ActionTypes.UPDATE_ANSWER_LIST:
      _answers = [];
      _isLoading = true;
    break;

    case ActionTypes.RECEIVE_ANSWER_LIST:
      AnswerStore.init(action.answers);
      _isLoading = false;
      AnswerStore.emitChange();
    break;

    case ActionTypes.RECEIVE_QUESTION:
      AppDispatcher.waitFor([QuestionStore.dispatchToken]);
      AnswerStore.emitChange();
    break;

    default:

  }

});

module.exports = AnswerStore;
