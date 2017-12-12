import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Applications from '../../../src/components/Applications'

describe('Applications component', () => {
  const sandbox = sinon.sandbox.create() 

  afterEach(() => {
    sandbox.restore()
  })

  it('calls features client when mounting', async () => {
    const expectApplications = [
      {id: 1, name: 'SomeApp'}
    ]
    sandbox.stub(client, 'fetch').resolves({
      data: expectApplications
    }) 
    const wrapper = shallow(<Applications />)
    await wrapper.instance().componentDidMount()

    expect(wrapper.state('applications')).toEqual(expectApplications)
  })
})
