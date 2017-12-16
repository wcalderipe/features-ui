import sinon from 'sinon'
import {React, shallow, waitThenUpdate} from './testSetup'

import * as client from '../../../src/clients/api'
import Application from '../../../src/components/Application'

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
    await waitThenUpdate(fetchPromise, wrapper)

    expect(wrapper.state('application')).toEqual(expectApplication)
  })

  it('renders ApplicationFeatures with given props', async () => {
    const wrapper = shallow(<Application {...props} />)
    const expectedFeaturesProps = {
      applicationId: '1'
    }
    await waitThenUpdate(fetchPromise, wrapper)
    const features = wrapper.find('ApplicationFeatures')

    expect(features.exists()).toEqual(true)
    expect(features.props()).toEqual(expectedFeaturesProps)
  })
})
