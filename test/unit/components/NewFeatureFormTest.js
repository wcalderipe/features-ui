import sinon from 'sinon'
import {React, shallow, waitThenUpdate} from './testSetup'

import * as client from '../../../src/clients/api'
import NewFeatureForm from '../../../src/components/NewFeatureForm'

describe('NewFeatureForm component', () => {
  const sandbox = sinon.sandbox.create()
  const props = {
    match: {
      params: {applicationId: '99'}
    }
  }

  afterEach(() => {
    sandbox.restore()
  })

  it('starts with empty state', () => {
    const wrapper = shallow(<NewFeatureForm {...props} />)

    expect(wrapper.state('name')).toEqual('')
    expect(wrapper.state('submitSucceeded')).toEqual(false)
  })

  it('does not redirect to application features list', () => {
    const wrapper = shallow(<NewFeatureForm {...props} />)
    const redirect = wrapper.find('Redirect')

    expect(redirect.exists()).toEqual(false)
  })

  describe('on submit', () => {
    let postPromise

    beforeEach(() => {
      postPromise = Promise.resolve({
        data: {id: 66}
      })
      sandbox.stub(client, 'post').resolves(postPromise)
    })

    it('calls client with feature name and application id', () => {
      const wrapper = shallow(<NewFeatureForm {...props} />)
      const expectedResource = 'features'
      const expectedPayload = {
        applicationId: 99,
        name: 'new_feature'
      }

      wrapper.find('.feature-name').simulate('change', {
        target: {
          value: 'new_feature'
        }
      })
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      })

      sinon.assert.calledWith(client.post, expectedResource, expectedPayload)
    })

    it('redirects to application features list', async () => {
      const wrapper = shallow(<NewFeatureForm {...props} />)
      wrapper.setState({name: 'new_feature'})
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      })

      await waitThenUpdate(postPromise, wrapper)
      const redirect = wrapper.find('Redirect')

      expect(redirect.exists()).toEqual(true)
      expect(redirect.prop('to')).toEqual('/applications/99')
    })
  })
})
