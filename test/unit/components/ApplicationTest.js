import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Application from '../../../src/components/Application'

describe('Application component', () => {
  const sandbox = sinon.sandbox.create() 

  afterEach(() => {
    sandbox.restore()
  })

  it('calls features client with application id from url', () => {
    sandbox.stub(client, 'fetch').resolves({
      data: {
	id: 1,
	name: 'SomeApp'
      }
    }) 

    const props = {
      match: {
	params: {applicationId: '1'}
      }
    }

    const wrapper = shallow(<Application {...props} />)

    sinon.assert.calledWith(client.fetch, 'applications/1')
  })
})
