import sinon from 'sinon'
import {MemoryRouter} from 'react-router-dom'
import {React, mount} from '../../unit/components/testSetup'

import * as client from '../../../src/clients/api'
import NewFeatureForm from '../../../src/components/NewFeatureForm'

describe.skip('NewFeatureForm component', () => {
  const sandbox = sinon.sandbox.create()
  const props = {
    match: {
      params: {applicationId: '99'}
    }
  }

  afterEach(() => {
    sandbox.restore()
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
      const app = mount(
        <MemoryRouter initialEntries={['/applications/99/features/new']}>
          <NewFeatureForm {...props} />
        </MemoryRouter>
      )
      const wrapper = app.find('NewFeatureForm')

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

    it('redirects to application features list', () => {
      const app = mount(
        <MemoryRouter initialEntries={['/applications/99/features/new']}>
          <NewFeatureForm {...props} />
        </MemoryRouter>
      )
      const wrapper = app.find('NewFeatureForm')

      const input = wrapper.find('.feature-name')
      input.simulate('change', {
        target: {value: 'new_feature'}
      })

      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      })
      const redicert = wrapper.find('Redirect')

      expect(redicert.exists()).toEqual(true)
    })
  })
})
