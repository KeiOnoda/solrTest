import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://13.231.201.206:3000/`
  })
}
