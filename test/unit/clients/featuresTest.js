import sinon from 'sinon'
import axios from 'axios'
import {fetch, post, destroy} from '../../../src/clients/features'

describe('features client', () => {
  const sandbox = sinon.sandbox.create()

  afterEach(() => {
    sandbox.restore()
  })

  const expectedOptions = {
    headers: {
      'content-type': 'application/json'
    }
  }

  describe('fetch', () => {
    beforeEach(() => {
      sandbox.stub(axios, 'get').resolves({
	data: [
	  {id: 1, name: 'SomeApp'},
	  {id: 2, name: 'OtherApp'}
	]
      })
    })

    it('calls client with full api url and options', async () => {
      const expectedURL = 'https://features-api.herokuapp.com/applications'

      const response = await fetch('applications')

      sinon.assert.calledWith(axios.get, expectedURL, expectedOptions)
    })  
  })

  describe('post', () => {
    beforeEach(() => {
      sandbox.stub(axios, 'post').resolves({
	id: 99
      })
    })

    it('calls client with full api url, payload and options', async () => {
      const expectedURL = 'https://features-api.herokuapp.com/applications'
      const payload = {
	name: 'application01'
      }

      const response = await post('applications', payload)

      sinon.assert.calledWith(axios.post, expectedURL, payload, expectedOptions)
    })
  })

  describe('destroy', () => {
    beforeEach(() => {
      sandbox.stub(axios, 'delete').resolves({
	status: 204
      })
    })

    it('calls client with full api url', async () => {
      const expectedURL = 'https://features-api.herokuapp.com/applications/99'

      const response = await destroy('applications/99')

      sinon.assert.calledWith(axios.delete, expectedURL)
    })
  })
})

