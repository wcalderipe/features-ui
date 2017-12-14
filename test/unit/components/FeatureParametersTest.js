import sinon from 'sinon'
import {React, shallow, waitThenUpdate} from './testSetup'

import * as client from '../../../src/clients/api'
import FeatureParameters from '../../../src/components/FeatureParameters'

describe('FeatureParameters component', () => {
  const sandbox = sinon.sandbox.create() 
  const props = {
    featureId: 1
  }
  const expectedParameters = [
    {
      id: 1, 
      rule: {
	type: 'string',
	name: 'tripType',
	given: 'oneway'
      }
    },
    {
      id: 2, 
      rule: {
	type: 'list',
	name: 'country',
	presentIn: ['br', 'ar']
      }
    }
  ]
  const fetchPromise = Promise.resolve({data: expectedParameters})

  beforeEach(() => {
    sandbox.stub(client, 'fetch').returns(fetchPromise)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('renders a link to parameter form page', () => {
    const wrapper = shallow(<FeatureParameters {...props} />)
    const link = wrapper.find('Link')

    expect(link.exists()).toEqual(true)
    expect(link.prop('to')).toEqual('/features/1/parameters/new')
  })
  
  it('fetches parameters by feature id after mount', async () => {
    const wrapper = shallow(<FeatureParameters {...props} />)
    await waitThenUpdate(fetchPromise, wrapper)

    expect(wrapper.state('parameters')).toEqual(expectedParameters)
  })

  it('renders a row for each parameter', async () => {
    const wrapper = shallow(<FeatureParameters {...props} />)
    await waitThenUpdate(fetchPromise, wrapper)

    expect(wrapper.find('tbody').children().length).toEqual(2)
  })

  describe('on delete parameter', () => {
    const destroyPromise = Promise.resolve({status: 204})

    beforeEach(() => {
      sandbox.stub(client, 'destroy').returns(destroyPromise)
    })

    it('calls api client destroy with parameter resource', async () => {
      const wrapper = shallow(<FeatureParameters {...props} />)
      await waitThenUpdate(fetchPromise, wrapper)

      const rows = wrapper.find('tbody tr')
      const firstRow = rows.first()
      firstRow.find('a').simulate('click')
       
      sinon.assert.calledWith(client.destroy, 'parameters/1')
    })

    it('removes parameter from state', async () => {
      const wrapper = shallow(<FeatureParameters {...props} />)
      await waitThenUpdate(fetchPromise, wrapper)

      const rows = wrapper.find('tbody tr')
      const firstRow = rows.first()
      firstRow.find('a').simulate('click')
      await waitThenUpdate(destroyPromise, wrapper)

      expect(wrapper.state('parameters').length).toEqual(1)
    })
  })
})

