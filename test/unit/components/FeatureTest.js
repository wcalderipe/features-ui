import sinon from 'sinon'
import {React, shallow, waitThenUpdate} from './testSetup'

import * as client from '../../../src/clients/api'
import Feature from '../../../src/components/Feature'

describe('Feature component', () => {
  const sandbox = sinon.sandbox.create()
  const props = {
    match: {
      params: {featureId: '1'}
    }
  }
  const expectedFeature = {
    id: 1,
    name: 'feature01'
  }
  const fetchPromise = Promise.resolve({data: expectedFeature})

  beforeEach(() => {
    sandbox.stub(client, 'fetch').returns(fetchPromise)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('fetches feature by id after component mount', async () => {
    const wrapper = shallow(<Feature {...props} />)
    await waitThenUpdate(fetchPromise, wrapper)

    expect(wrapper.state('feature')).toEqual(expectedFeature)
  })

  it('renders FeatureParameters with given props', async () => {
    const wrapper = shallow(<Feature {...props} />)
    const expectedProps = {
      featureId: '1'
    }
    await waitThenUpdate(fetchPromise, wrapper)
    const parameters = wrapper.find('FeatureParameters')

    expect(parameters.exists()).toEqual(true)
    expect(parameters.props()).toEqual(expectedProps)
  })
})
