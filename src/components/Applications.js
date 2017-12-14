import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {fetch} from '../clients/api'

class Applications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      applications: []
    }
  }

  async componentDidMount () {
    const response = await fetch('applications')

    this.setState({applications: response.data})
  }

  renderRow (application) {
    const {id, name} = application

    return (
      <tr key={id}>
        <td>
          <Link to={`/applications/${id}`}>{name}</Link>
        </td>
      </tr>
    )
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='page-header'>Applications</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.applications.map(this.renderRow)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Applications
