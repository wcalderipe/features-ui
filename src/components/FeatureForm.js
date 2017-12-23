import React from 'react'
import PropTypes from 'prop-types'

const FeatureForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div className='form-group'>
      <label>Name:</label>
      <input
        type='text'
        onChange={props.onChange}
        className='feature-name form-control' />
    </div>
    <div className='form-group'>
      <input
        className='btn btn-default btn-submit'
        type='submit'
        value='Add' />
    </div>
  </form>
)

FeatureForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default FeatureForm
