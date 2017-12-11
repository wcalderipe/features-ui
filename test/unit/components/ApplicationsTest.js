import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/features'
import Applications from '../../../src/components/Applications'

describe.only('Applications component', () => {
  const sandbox = sinon.sandbox.create() 

  afterEach(() => {
    sandbox.restore()
  })

  it('calls features client when mounting', () => {
    sandbox.stub(client, 'fetch').resolves({
      data: []
    }) 
    
    shallow(<Applications />)

    sinon.assert.calledWith(client.fetch, 'applications')
  })
})
