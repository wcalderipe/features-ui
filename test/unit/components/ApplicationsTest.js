import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Applications from '../../../src/components/Applications'

describe('Applications component', () => {
  const sandbox = sinon.sandbox.create() 

  afterEach(() => {
    sandbox.restore()
  })

  it('calls features client when mounting', () => {
    const expectApplications = [
      {id: 1, name: 'SomeApp'}
    ]
    const promise = Promise.resolve({data: expectApplications})
    sandbox.stub(client, 'fetch').returns(promise)
    const wrapper = shallow(<Applications />)

    return promise
      .then(() => {
	expect(wrapper.state()).toHaveProperty('applications')

	wrapper.update()	
      }).then(() => {
	expect(wrapper.state('applications')).toEqual(expectApplications)
      })
  })
})
