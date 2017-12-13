import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {fetch} from '../clients/features'

class FeatureParameters extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      parameters: []
    }
  }

  async componentDidMount () {
    const {featureId} = this.props
    const response = await fetch(`features/${featureId}/parameters`)

    this.setState({parameters: response.data})
  }

  renderRow (parameter) {
    const {id, rule} = parameter 

    return (
      <tr key={id}>
	<td>{JSON.stringify(rule)}</td>
      </tr>
    )
  }

  render () {
    return (
      <div className='row'> 
	<div className='col-md-12'>
	  <table className='table'>
	      <thead>
		<tr>
		  <th>Parameters</th>
		</tr>
	      </thead>
	      <tbody>
		{this.state.parameters.map(this.renderRow)}
	      </tbody>
	  </table>
	</div> 
      </div> 
    )
  }
}

export default FeatureParameters

