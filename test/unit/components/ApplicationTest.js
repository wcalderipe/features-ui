import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Application from '../../../src/components/Application'
import ApplicationFeatures from '../../../src/components/ApplicationFeatures'

describe('Application component', () => {
  const sandbox = sinon.sandbox.create() 
  const props = {
    match: {
      params: {applicationId: '1'}
    }
  }
  const expectApplication = {
    id: 1,
    name: 'SomeApp'
  }
  const fetchPromise = Promise.resolve({data: expectApplication})

  beforeEach(() => {
    sandbox.stub(client, 'fetch').returns(fetchPromise)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('fetches feature by id after component mount', async () => {
    const wrapper = shallow(<Application {...props} />)

    await fetchPromise

    expect(wrapper.state()).toHaveProperty('application')
    wrapper.update()	
    expect(wrapper.state('application')).toEqual(expectApplication)
  })

  it('renders ApplicationFeatures with given props', async () => {
    const wrapper = shallow(<Application {...props} />)
    const expectedProps = {
      applicationId: '1'
    }

    await fetchPromise
    wrapper.update()	

    const features = wrapper.find('ApplicationFeatures')

    expect(features.exists()).toEqual(true)
    expect(features.props()).toEqual(expectedProps)
  })
})

