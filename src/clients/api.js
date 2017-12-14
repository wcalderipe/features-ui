import axios from 'axios'

const BASE_URL = 'https://features-api.herokuapp.com'

const headers = {
  'content-type': 'application/json'
}

const fetch = (resource) => axios.get(url(resource), {headers})

const post = (resource, payload) => axios.post(url(resource), payload, {headers})

const destroy = (resource) => axios.delete(url(resource))

const url = (resource) => `${BASE_URL}/${resource}`

export {fetch, post, destroy}
