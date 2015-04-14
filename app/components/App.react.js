'use strict';

var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var ActionCreators = require('../actions/ActionCreators');
var QuestionStore = require('../stores/QuestionStore');

var App = React.createClass({
  mixins: [ParseReact.Mixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  observe: function() {
    return {
      user: ParseReact.currentUser
    };
  },

  componentWillMount: function(){
    if (!this.data.user) {
      this.context.router.transitionTo('/login', {});
    }else{
      if (this.context.router.getCurrentPathname().match("^/answer")) {
        ActionCreators.updateAnswerList(this.context.router.getCurrentParams().id);
      }else{
        ActionCreators.updateQuestionList();
      }
    }
  },

  componentWillUpdate: function(){
    if (this.context.router.getCurrentPathname() === '/') {
      if (QuestionStore.getQuestions().length < 2) {
        ActionCreators.updateQuestionList();
      }
    }
  },

  render: function () {
    var logoutButton = <button onClick={this.logOut} className="btn btn-default btn-sm">Logout</button>;
    return (
      <div className="App">
        <header className="page-header">
        <h1>Q&A</h1>
          {this.data.user ? <label className="userName" >User Name: {this.data.user.username}</label> : null}
          {this.data.user ? logoutButton : null}
        </header>
        <div className="MainSection">
          <RouteHandler/>
        </div>
      </div>
    );
  },

  logOut: function() {
    Parse.User.logOut();
    this.context.router.transitionTo('/login', {});
    ActionCreators.logout();
  }

});

module.exports = App;
