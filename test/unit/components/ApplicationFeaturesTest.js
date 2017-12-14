import sinon from 'sinon'
import {React, shallow, waitThenUpdate} from './testSetup'

import * as client from '../../../src/clients/api'
import ApplicationFeatures from '../../../src/components/ApplicationFeatures'

describe('ApplicationFeatures component', () => {
  const sandbox = sinon.sandbox.create() 
  const props = {
    applicationId: 1
  }
  const expectedFeatures = [
    {id: 1, name: 'feature01'},
    {id: 2, name: 'feature02'}
  ]
  const fetchPromise = Promise.resolve({data: expectedFeatures})

  beforeEach(() => {
    sandbox.stub(client, 'fetch').returns(fetchPromise)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('fetches features by application id after mount', async () => {
    const wrapper = shallow(<ApplicationFeatures {...props} />)
    await waitThenUpdate(fetchPromise, wrapper)

    expect(wrapper.state('features')).toEqual(expectedFeatures)
  })

  it('renders a row for each feature', async () => {
    const wrapper = shallow(<ApplicationFeatures {...props} />)
    await waitThenUpdate(fetchPromise, wrapper)

    expect(wrapper.find('tbody').children().length).toEqual(2)
  })
})

