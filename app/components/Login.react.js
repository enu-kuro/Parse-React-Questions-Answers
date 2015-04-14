'use strict';

var React = require('react');
var Parse = require('parse').Parse;
var ActionCreators = require('../actions/ActionCreators');

var SUBMIT_TYPE = {
 SINGUP: 0,
 LOGIN : 1
};

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      error: null
    };
  },

  render: function() {
    return (
      <div>
        <div className='loginForm'>
          {
            this.state.error ?
            <div className='row centered errors'>{this.state.error}</div> :
            null
          }
          <div className='row'>
            <label htmlFor='username'>Username</label>
            <input ref='username' id='username' type='text' />
          </div>
          <div className='row'>
            <label htmlFor='password'>Password</label>
            <input ref='password' id='password' type='password' />
          </div>
          <div className='row centered'>
            <button className='btn btn-default' onClick={this.onLogin}>
              Log in
            </button>
            <button className='btn btn-default' onClick={this.onSignup}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  },

  onLogin: function(){
    this.submit(SUBMIT_TYPE.LOGIN);
  },
  onSignup: function(){
    this.submit(SUBMIT_TYPE.SINGUP);
  },

  submit: function(submitType) {
    var self = this;
    var username = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;
    if (username.length && password.length) {
      if ( submitType === SUBMIT_TYPE.SINGUP) {
        var u = new Parse.User({
          username: username,
          password: password
        });
        u.signUp().then(function() {
          self.submitSuccess();
        }, function() {
          self.setState({
            error: 'Invalid account information'
          });
        });
      } else {
        Parse.User.logIn(username, password).then(function() {
          self.submitSuccess();
        }, function() {
          self.setState({
            error: 'Incorrect username or password'
          });
        });
      }
    } else {
      this.setState({
        error: 'Please enter all fields'
      });
    }
  },

  submitSuccess: function(){
    this.setState({
      error: null
    });

    var { router } = this.context;
    var nextPath = router.getCurrentQuery().nextPath;
    if (nextPath && nextPath.lastIndexOf('/answer/', 0) === 0) {
      router.replaceWith(nextPath);
      var pathArray = nextPath.split('/');
      ActionCreators.updateAnswerList(pathArray[pathArray.length-1]);
    } else {
      router.replaceWith('/');
      ActionCreators.updateQuestionList();
    }
  }

});

module.exports = Login;
