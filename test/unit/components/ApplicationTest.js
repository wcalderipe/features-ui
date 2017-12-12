import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Application from '../../../src/components/Application'

describe('Application component', () => {
  const sandbox = sinon.sandbox.create() 
  const props = {
    match: {
      params: {applicationId: '1'}
    }
  }

  afterEach(() => {
    sandbox.restore()
  })

  it('fetches feature by id after component mount', async () => {
    const expectApplication = {
      id: 1,
      name: 'SomeApp'
    }
    const fetchPromise = Promise.resolve({data: expectApplication})
    sandbox.stub(client, 'fetch').returns(fetchPromise)
    const wrapper = shallow(<Application {...props} />)

    await fetchPromise

    expect(wrapper.state()).toHaveProperty('application')
    wrapper.update()	
    expect(wrapper.state('application')).toEqual(expectApplication)
  })
})
