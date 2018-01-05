import sinon from 'sinon'
import axios from 'axios'
import {fetch, post, destroy, update} from '../../../src/clients/api'

describe('api client', () => {
  const sandbox = sinon.sandbox.create()
  const expectedOptions = {
    headers: {
      'content-type': 'application/json'
    }
  }

  beforeEach(() => {
    process.env.API_URL = 'http://127.0.0.1:3000'
  })

  afterEach(() => {
    sandbox.restore()
  })

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
      const expectedURL = 'http://127.0.0.1:3000/applications'
      await fetch('applications')

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
      const expectedURL = 'http://127.0.0.1:3000/applications'
      const payload = {
        name: 'application01'
      }
      await post('applications', payload)

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
      const expectedURL = 'http://127.0.0.1:3000/applications/99'
      await destroy('applications/99')

      sinon.assert.calledWith(axios.delete, expectedURL)
    })
  })

  describe('update', () => {
    beforeEach(() => {
      sandbox.stub(axios, 'put').resolves({
        status: 200
      })
    })

    it('calls client with full api url and options', async () => {
      const expectedURL = 'http://127.0.0.1:3000/applications/99'
      const payload = {
        name: 'application01'
      }
      await update('applications/99', payload)

      sinon.assert.calledWith(axios.put, expectedURL, payload, expectedOptions)
    })
  })
})
