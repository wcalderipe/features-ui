import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {fetch} from '../clients/api'
import FeatureParameters from './FeatureParameters'

class Feature extends Component {
  constructor (props) {
    super(props)

    this.state = {
      feature: {}
    }
  }

  async componentDidMount () {
    const {featureId} = this.props.match.params
    const response = await fetch(`features/${featureId}`)

    this.setState({feature: response.data})
  }

  render () {
    const {featureId} = this.props.match.params

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='page-header'>Feature: {this.state.feature.name}</h1>
          </div>
        </div>
        <FeatureParameters featureId={featureId} />
      </div>
    )
  }
}

Feature.propTypes = {
  match: PropTypes.object
}

export default Feature
