import 'core-js/es6/map'
import 'core-js/es6/set'

import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Applications from './Applications'
import Application from './Application'
import Feature from './Feature'
import ParameterForm from './ParameterForm'

const App = () => (
  <Switch>
    <Route exact path='/' component={Applications} />
    <Route path='/applications/:applicationId' component={Application} />
    <Route exact path='/features/:featureId' component={Feature} />
    <Route path='/features/:featureId/parameters/new' component={ParameterForm} />
  </Switch>
)

export default App
