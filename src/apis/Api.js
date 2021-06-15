import axios from 'axios'

axios.interceptors.request.use(request => {
  if (request.method == 'post') {
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
      localStorage.removeItem('token');
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

export function removeOneCakeFromCart(token, cakeid) {
  return axios({method:"post", url: process.env.REACT_APP_CAKE_API_URL + "removeonecakefromcart", headers: {authtoken: token}, data:{cakeid:cakeid}})
    .then(response => response.data, error => [])
}

export function removeCakeFromCart(token, cakeid) {
  return axios({method:"post", url: process.env.REACT_APP_CAKE_API_URL + "removecakefromcart", headers: {authtoken: token}, data:{cakeid:cakeid}})
    .then(response => response.data, error => [])
}

export const createOrder = (token, cart, address) => {
  return axios({
    method:"post",
    url: process.env.REACT_APP_CAKE_API_URL + "addcakeorder",
    headers: {authtoken: token},
    data:{
      name: address.fullname,
      city: address.city,
      pincode: address.pincode,
      address: address.addressLine,
      phone: address.phone,
      price: cart.totalPrice,
      cakes: cart.items
    }
  })
}

export const getOrders = (token) => {
  return axios({method:"post", url: process.env.REACT_APP_CAKE_API_URL + "cakeorders", headers: {authtoken: token}})
    .then(response => response.data, error => [])
}

export const cakeImageUpload = (formData) => {
  return axios({
    url: process.env.REACT_APP_CAKE_API_URL + 'upload',
    method: 'post',
    data: formData
  }).then(response => response.data, err => [])
}

export const addNewCake = (action) => {
  return axios({
    url: process.env.REACT_APP_CAKE_API_URL + 'addcake',
    method: "post",
    data: action.payload || {}
  })
}
