import 'core-js/es6/map'
import 'core-js/es6/set'

import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Applications from './Applications'
import Application from './Application'
import Feature from './Feature'

class App extends Component {
  render () {
    return (
      <Switch>
	<Route exact path='/' component={Applications}/>
	<Route path='/applications/:applicationId' component={Application}/>
	<Route path='/features/:featureId' component={Feature}/>
      </Switch>
    )
  }
}

export default App

