import axios from 'axios'

axios.interceptors.request.use(request => {
  if (request.url.includes('cart')) {
    request.headers.authtoken = localStorage.token
  }
  return request
})
export function getAllCakes() {
  return axios({method:"get", url: process.env.REACT_APP_CAKE_API_URL + "allcakes"})
    .then(response => response.data.data, error => [])
}

export function signUp(user) {
  // console.log('user', user)
  return axios({method:"post", url: process.env.REACT_APP_CAKE_API_URL + "register", data:user})
    .then((response) => response.data, error => console.log(error))
}

export function login(email, password) {
  return axios({method:"post", url: process.env.REACT_APP_CAKE_API_URL + "login", data:{email: email, password: password}})
    .then((response) => {
      // console.log('cakes', response.data.data);
      return response.data;
    }, (error) => [])
}

export function getCakeById(id) {
  return axios({method:"get", url: process.env.REACT_APP_CAKE_API_URL + "cake/" + id})
    .then(response => response.data.data, error => [])
}

export function getCakesBySearchKeyword(searchString) {
  return axios({method:"get", url: process.env.REACT_APP_CAKE_API_URL + "searchcakes?q=" + searchString})
    .then(response => response.data.data, error => [])
}

export function getUserByToken(token) {
  return axios({method:"get", url: process.env.REACT_APP_CAKE_API_URL + "getuserdetails", headers: {authtoken: token}})
    .then(response => response.data.data, error => {
      console.log(error);
      return error
    })
}

export function addToCart(token, cakeData) {
  return axios({
    method:"post",
    url: process.env.REACT_APP_CAKE_API_URL + "addcaketocart",
    headers: {authtoken: token},
    data:cakeData
  })
    .then((response) => {
      // console.log('cakes', response.data.data);
      return response.data;
    }, (error) => [])
}

export function getCart(token) {
  return axios({method:"post", url: process.env.REACT_APP_CAKE_API_URL + "cakecart", headers: {authtoken: token}})
    .then(response => response.data, error => [])
}
