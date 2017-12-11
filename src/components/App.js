import 'core-js/es6/map'
import 'core-js/es6/set'

import React, {Component} from 'react'
import Applications from './Applications'
import Application from './Application'
import {Switch, Route} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Switch>
	<Route exact path='/' component={Applications}/>
	<Route path='/applications/:applicationId' component={Application}/>
      </Switch>
    )
  }
}

export default App

