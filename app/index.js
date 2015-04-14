'use strict';

var React = require('react');
var Parse = require('parse').Parse;

window.React = React; // export for http://fb.me/react-devtools

var Router = require('react-router');
var { Route, DefaultRoute, NotFoundRoute} = Router;

var App = require('./components/App.react');
var Login = require('./components/Login.react');
var AnswerSection = require('./components/AnswerSection.react');
var QuestionSection = require('./components/QuestionSection.react');

// Insert your app's keys here:
Parse.initialize('APPLICATION_ID', 'JAVASCRIPT_KEY');

var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="question" handler={QuestionSection}/>
    <Route name="answer" path="answer/:id" handler={AnswerSection}/>
    <Route name="login" handler={Login}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});
