import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

import {post} from '../clients/api'
import FeatureForm from './FeatureForm'

class NewFeatureForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      submitSucceeded: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      name: event.target.value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const {applicationId} = this.props.match.params
    const payload = {
      applicationId: parseInt(applicationId),
      name: this.state.name
    }
    await post('features', payload)

    this.setState({submitSucceeded: true})
  }

  redirectToApplicationFeatures (shouldRedirect, applicationId) {
    return shouldRedirect
      ? <Redirect to={`/applications/${applicationId}`} />
      : null
  }

  render () {
    const {applicationId} = this.props.match.params
    const {submitSucceeded} = this.state

    const featureFormProps = {
      onSubmit: this.handleSubmit,
      onChange: this.handleChange
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='page-header'>Add new feature</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <FeatureForm {...featureFormProps} />
            {this.redirectToApplicationFeatures(submitSucceeded, applicationId)}
          </div>
        </div>
      </div>
    )
  }
}

NewFeatureForm.propTypes = {
  match: PropTypes.object
}

export default NewFeatureForm
