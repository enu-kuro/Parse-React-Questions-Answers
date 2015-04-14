'use strict';

var ActionCreators = require('../actions/ActionCreators');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = {

  createQuestion: function(message) {
    var user = Parse.User.current();

    return ParseReact.Mutation.Create('Question', {
      message: message,
      user: user
    }).dispatch()

  },

  getQuestions: function(){
    var query = new Parse.Query("Question");
    return query.include("user").descending('createdAt').find()
  },

  createComment: function(Answers, topicId) {
    var user = Parse.User.current();

    return ParseReact.Mutation.Create('Comment', {
      Answers: Answers,
      user: user,
      topicId: topicId
    }).dispatch()

  },

  getAnswers: function(questionId){
    var query = new Parse.Query("Answer");
    return query.equalTo("questionId", questionId).include("user").ascending('createdAt').find()

  },

  getQuestion: function(questionId){
    var query = new Parse.Query("Question");
    return query.equalTo("objectId", questionId).include("user").find()

  },

  createAnswer: function(message, questionId) {
    var user = Parse.User.current();

    return ParseReact.Mutation.Create('Answer', {
      questionId: questionId,　　
      message: message,
      user: user
    }).dispatch()

  }
  
};
