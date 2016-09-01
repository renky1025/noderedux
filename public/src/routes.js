import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './containers/App';
import AboutMe from './components/AboutMe';

export default (
	<Router history={hashHistory}>
	  <Route path="/" component={App}>
	    <Route path="/about" component={AboutMe}/>
	  </Route>
	</Router>
);