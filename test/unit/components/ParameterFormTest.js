import sinon from 'sinon'
import {React, shallow, waitThenUpdate} from './testSetup'

import * as client from '../../../src/clients/api'
import ParameterForm from '../../../src/components/ParameterForm'

describe('ParameterForm component', () => {
  const sandbox = sinon.sandbox.create()

  const props = {
    match: {
      params: {featureId: '99'}
    }
  }

  afterEach(() => {
    sandbox.restore()
  })

  it('does not redirects to feature page', () => {
    const wrapper = shallow(<ParameterForm {...props} />) 
    const redirect = wrapper.find('Redirect')

    expect(redirect.exists()).toEqual(false)
  })

  describe('on submit', () => {
    let postPromise

    beforeEach(() => {
      postPromise = Promise.resolve({
	data: {id: 99}
      })
      sandbox.stub(client, 'post').returns(postPromise)
    })

    it('calls client with textarea parsed text as payload', () => {
      const wrapper = shallow(<ParameterForm {...props} />) 

      const expectedResource = 'parameters'    
      const expectedPayload = {
	feature_id: 99,
	rule: {
	  type: 'list',
	  name: 'country',
	  presentIn: ['br', 'ar']
	}
      }

      wrapper.find('textarea').simulate('change', {
	target: {
	  value: JSON.stringify(expectedPayload.rule)
	}
      })
      wrapper.find('form').simulate('submit', {
	preventDefault: () => {}
      })

      sinon.assert.calledWith(client.post, expectedResource, expectedPayload)
    })

    it('redirects to feature page', async () => {
      const wrapper = shallow(<ParameterForm {...props} />) 
      wrapper.setState({rule: '{}'})
      wrapper.find('form').simulate('submit', {
	preventDefault: () => {}
      })

      await waitThenUpdate(postPromise, wrapper)
      const redirect = wrapper.find('Redirect')

      expect(redirect.exists()).toEqual(true)
      expect(redirect.prop('to')).toEqual('/features/99')
    })
  })
})

