import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {fetch, destroy} from '../clients/api'

class FeatureParameters extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      parameters: []
    }

    this.renderRow = this.renderRow.bind(this)
  }

  async componentDidMount() {
    const {featureId} = this.props
    const response = await fetch(`features/${featureId}/parameters`)

    this.setState({parameters: response.data})
  }

  renderRow(parameter) {
    const {id, rule} = parameter 

    return (
      <tr key={id}>
	<td>{JSON.stringify(rule)}</td>
	<td>
	  <button 
	    onClick={() => this.handleDeleteClick(id)} 
	    type='button' 
	    className='btn btn-danger btn-xs'>Delete</button>
	</td>
      </tr>
    )
  }

  async handleDeleteClick(parameterId) {
    await destroy(`parameters/${parameterId}`)

    const {parameters} = this.state

    this.setState({
      parameters: parameters.filter(({id}) => id !== parameterId)
    })
  }

  render() {
    const {featureId} = this.props

    return (
      <div className='row'> 
	<div className='col-md-12'>
	  <Link to={`/features/${featureId}/parameters/new`}>Add new parameter</Link>
	</div>
	<div className='col-md-12'>
	  <table className='table'>
	      <thead>
		<tr>
		  <th>Parameters</th>
		  <th></th>
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

