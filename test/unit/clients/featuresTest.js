import sinon from 'sinon'
import axios from 'axios'
import {fetch} from '../../../src/clients/features'

describe('features client', () => {
  describe('fetch', () => {
    const sandbox = sinon.sandbox.create()

    beforeEach(() => {
      sandbox.stub(axios, 'get').resolves({
	data: [
	  {id: 1, name: 'SomeApp'},
	  {id: 2, name: 'OtherApp'}
	]
      })
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('calls http client with given options', async () => {
      const expectedURL = 'https://features-api.herokuapp.com/applications'
      const expectedOptions = {
	headers: {
	  'content-type': 'application/json'
	}
      }

      const response = await fetch('applications')

      sinon.assert.calledWith(axios.get, expectedURL, expectedOptions)
    })  
  })
})

