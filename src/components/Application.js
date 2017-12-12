import React, {Component} from 'react'
import {fetch} from '../clients/features'

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
    return (
      <div className='container'>
	<div className='row'>
	  <div className='col-md-12'>
	    <h1 className='page-header'>Application: {this.state.application.name}</h1>
	  </div>
	</div>
	<div className='row'> 
	  <div className='col-md-12'>
	  </div> 
	</div> 
      </div>
    )
  }
}

export default Application

