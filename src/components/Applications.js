import React, {Component} from 'react'

class Applications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      applications: [
	{id: 1, name: 'SomeApp'},
	{id: 2, name: 'OtherApp'},
      ]
    }
  }

  renderRow (application) {
    const {id, name} = application

    return (
      <tr key={id}>
	<td>{name}</td>
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



