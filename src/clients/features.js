import axios from 'axios' 

const BASE_URL = 'https://features-api.herokuapp.com'

const headers = {
  'content-type': 'application/json'
}

const fetch = (resource) => {
  const url = `${BASE_URL}/${resource}`

  return axios.get(url, {headers})
}

export {fetch}

