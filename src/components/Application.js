import React, {Component} from 'react'

import {fetch} from '../clients/features'
import ApplicationFeatures from './ApplicationFeatures'

class Application extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      application: {}
    }
  }

  async componentDidMount () {
    const {applicationId} = this.props.match.params
    const response = await fetch(`applications/${applicationId}`)

    this.setState({application: response.data})
  }

  render () {
    const {applicationId} = this.props.match.params

    return (
      <div className='container'>
	<div className='row'>
	  <div className='col-md-12'>
	    <h1 className='page-header'>Application: {this.state.application.name}</h1>
	  </div>
	</div>
	<ApplicationFeatures applicationId={applicationId} />
      </div>
    )
  }
}

export default Application

