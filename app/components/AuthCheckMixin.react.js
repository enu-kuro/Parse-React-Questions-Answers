'use strict';

var Parse = require('parse').Parse;

module.exports = {
  statics: {
    willTransitionTo: function (transition) {
      if (!Parse.User.current()){
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }
  }
};
