import axios from 'axios'

const headers = {
  'content-type': 'application/json'
}

const fetch = (resource) => axios.get(url(resource), {headers})

const post = (resource, payload) => axios.post(url(resource), payload, {headers})

const destroy = (resource) => axios.delete(url(resource))

const update = (resource, payload) => axios.put(url(resource), payload, {headers})

const url = (resource) => `${process.env.API_URL}/${resource}`

export {fetch, post, destroy, update}
