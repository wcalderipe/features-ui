import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

import {post} from '../clients/api'

class ParameterForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      rule: '',
      submitSucceeded: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      rule: event.target.value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const {featureId} = this.props.match.params
    const payload = {
      featureId: parseInt(featureId),
      rule: JSON.parse(this.state.rule)
    }

    await post('parameters', payload)

    this.setState({submitSucceeded: true})
  }

  render () {
    const {featureId} = this.props.match.params

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='page-header'>Add new parameter</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>Rule:</label>
                <textarea
                  value={this.state.value}
                  onChange={this.handleChange}
                  className='form-control'
                  rows='6'
                />
              </div>
              <div className='form-group'>
                <input className='btn btn-default' type='submit' value='Add' />
              </div>
            </form>
            {this.state.submitSucceeded && (
              <Redirect to={`/features/${featureId}`} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

ParameterForm.propTypes = {
  match: PropTypes.object
}

export default ParameterForm
