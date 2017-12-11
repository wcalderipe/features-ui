import axios from 'axios' 

const BASE_URL = 'http://localhost:3000/'

const headers = {
  'content-type': 'application/json'
}

const fetch = () => {
  return axios.get(BASE_URL, {headers})
}

export {fetch}
