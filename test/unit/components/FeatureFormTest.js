import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/api'
import FeatureForm from '../../../src/components/FeatureForm'

describe('FeatureForm component', () => {
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
    const wrapper = shallow(<FeatureForm {...props} />)

    expect(wrapper.state('name')).toEqual('')
  })

  describe('on submit', () => {
    it('calls client with feature name and application id', () => {
      sandbox.stub(client, 'post').resolves(true)

      const wrapper = shallow(<FeatureForm {...props} />)
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
  })
})
