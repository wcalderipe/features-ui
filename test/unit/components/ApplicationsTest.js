import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Applications from '../../../src/components/Applications'

describe('Applications component', () => {
  const sandbox = sinon.sandbox.create() 

  afterEach(() => {
    sandbox.restore()
  })

  it('fetches features after component mount', async () => {
    const expectApplications = [
      {id: 1, name: 'SomeApp'}
    ]
    const fetchPromise = Promise.resolve({data: expectApplications})
    sandbox.stub(client, 'fetch').returns(fetchPromise)
    const wrapper = shallow(<Applications />)

    await fetchPromise

    expect(wrapper.state()).toHaveProperty('applications')
    wrapper.update()	
    expect(wrapper.state('applications')).toEqual(expectApplications)
  })
})
