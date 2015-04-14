'use strict';

var keyMirror = require('react/lib/keyMirror');

export default {
  ActionTypes: keyMirror({
    LOGOUT: null,
    CREATE_QUESTION: null,
    UPDATE_QUESTION_LIST: null,
    RECEIVE_QUESTION_LIST: null,
    UPDATE_QUESTIONS_FAILED: null,
    UPDATE_ANSWER_LIST: null,
    RECEIVE_ANSWER_LIST: null,
    UPDATE_ANSWERS_FAILED: null,
    RECEIVE_QUESTION: null,
    CREATE_ANSWER: null
  })
};
