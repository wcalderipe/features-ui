import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {post} from '../clients/api'

class FeatureForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
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

    await post('features', {
      applicationId: parseInt(applicationId),
      name: this.state.name
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='page-header'>Add new feature</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>Name:</label>
                <input
                  value={this.state.value}
                  onChange={this.handleChange}
                  className='feature-name form-control'
                />
              </div>
              <div className='form-group'>
                <input className='btn btn-default' type='submit' value='Add' />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

FeatureForm.propTypes = {
  match: PropTypes.object
}

export default FeatureForm
