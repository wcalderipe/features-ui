import React, {Component} from 'react'

class Application extends Component {
  constructor (props) {
    super(props)

    this.state = {
      application: {
	id: 1,
	name: 'SomeApp'
      }
    }
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

