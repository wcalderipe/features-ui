import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {fetch} from '../clients/api'

class ApplicationFeatures extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      features: []
    }
  }

  async componentDidMount () {
    const {applicationId} = this.props
    const response = await fetch(`applications/${applicationId}/features`)

    this.setState({features: response.data})
  }

  renderRow (feature) {
    const {id, name} = feature

    return (
      <tr key={id}>
	<td>
	  <Link to={`/features/${id}`}>{name}</Link>
	</td>
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
		  <th>Features</th>
		</tr>
	      </thead>
	      <tbody>
		{this.state.features.map(this.renderRow)}
	      </tbody>
	  </table>
	</div> 
      </div> 
    )
  }
}

export default ApplicationFeatures


