import 'core-js/es6/map'
import 'core-js/es6/set'

import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Applications from './Applications'
import Application from './Application'
import Feature from './Feature'
import ParameterForm from './ParameterForm'
import NewFeatureForm from './NewFeatureForm'

const App = () => (
  <Switch>
    <Route exact path='/' component={Applications} />
    <Route exact path='/applications/:applicationId' component={Application} />
    <Route exact path='/features/:featureId' component={Feature} />
    <Route exact path='/features/:featureId/parameters/new' component={ParameterForm} />
    <Route exact path='/applications/:applicationId/features/new' component={NewFeatureForm} />
  </Switch>
)

export default App
