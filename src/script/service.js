import axios from 'axios'
const API_URL = "https://lottery-image-server.herokuapp.com"
// const API_URL = "http://localhost:3000"

export const sendImage = (image) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  }
  return axios.post(`${API_URL}/image`, {
    data: image
  }, headers)
}