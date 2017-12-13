import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
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

  it('fetches parameters by feature id after mount', async () => {
    const wrapper = shallow(<FeatureParameters {...props} />)

    await fetchPromise

    expect(wrapper.state()).toHaveProperty('parameters')
    wrapper.update()	
    expect(wrapper.state('parameters')).toEqual(expectedParameters)
  })

   it('renders a row for each parameter', async () => {
     const wrapper = shallow(<FeatureParameters {...props} />)
  
     await fetchPromise
     wrapper.update()	
  
     expect(wrapper.find('tbody').children().length).toEqual(2)
  })
})


