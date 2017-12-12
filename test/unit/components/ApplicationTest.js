import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Application from '../../../src/components/Application'

describe('Application component', () => {
  const sandbox = sinon.sandbox.create() 

  afterEach(() => {
    sandbox.restore()
  })

  it('calls features client with application id from url', async () => {
    const props = {
      match: {
	params: {applicationId: '1'}
      }
    }
    const expectApplication = {
      id: 1,
      name: 'SomeApp'
    }
    sandbox.stub(client, 'fetch').resolves({
      data: expectApplication
    }) 
    const wrapper = shallow(<Application {...props} />)
    await wrapper.instance().componentDidMount()

    expect(wrapper.state('application')).toEqual(expectApplication)
  })
})
