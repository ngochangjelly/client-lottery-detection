import axios from 'axios'
const API_URL = "https://lottery-image-server.herokuapp.com"
const headers = {
  "Content-Type": "application/json"
}

export const sendImage = (image) => {
  return axios.post(`${API_URL}/image`, {
    data: image
  }, headers)
}