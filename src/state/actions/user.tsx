import * as ActionTypes from '../actionTypes'
import axios from 'axios'
import { Dispatch } from 'redux'

export const requestToken = (dispatch: Dispatch<UserAction>, login: LoginData) => {
  dispatch({ type: ActionTypes.REQUEST_TOKEN_START })

  return axios.post(`${process.env.API_URL}/wp-json/jwt-auth/v1/token`, login)
    .then(response => {
      if (!response.data?.token) {
        throw 'Error retrieving user data :/'
      }

      localStorage.setItem('userToken', JSON.stringify(response.data))
      dispatch({ type: ActionTypes.REQUEST_TOKEN_SUCCESS, data: response.data })
    })
    .catch(error => {
      dispatch({ type: ActionTypes.REQUEST_TOKEN_FAILURE, error: error.toString() })
    })
}

export const validateCurrentToken = (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: ActionTypes.REQUEST_TOKEN_START })

  let storageToken: TokenResponseData | null = null

  try {
    const storageUserToken = localStorage.getItem('userToken')
    storageToken = storageUserToken ? JSON.parse(storageUserToken) : null
  } catch (error) {
    console.warn(error)
  }

  if (!storageToken || !storageToken?.token) {
    localStorage.removeItem('userToken')
    dispatch({ type: ActionTypes.VALIDATE_TOKEN_FAILURE })
    return Promise.resolve()
  }

  const headers = {
    Authorization: `Bearer ${storageToken.token}`,
  }

  return axios.post(`${process.env.API_URL}/wp-json/jwt-auth/v1/token/validate`, {}, { headers })
    .then(() => {
      dispatch({ type: ActionTypes.VALIDATE_TOKEN_SUCCESS, data: storageToken })
    })
    .catch(() => {
      localStorage.removeItem('userToken')
      dispatch({ type: ActionTypes.VALIDATE_TOKEN_FAILURE })
    })
}

export const doLogout = (dispatch: Dispatch<UserAction>) => {
  localStorage.removeItem('userToken')
  dispatch({ type: ActionTypes.USER_LOGOUT })
  return Promise.resolve()
}

export type UserAction = |
  { type: typeof ActionTypes.REQUEST_TOKEN_START } |
  { type: typeof ActionTypes.REQUEST_TOKEN_SUCCESS, data: TokenResponseData } |
  { type: typeof ActionTypes.REQUEST_TOKEN_FAILURE, error: string } |
  { type: typeof ActionTypes.VALIDATE_TOKEN_START } |
  { type: typeof ActionTypes.VALIDATE_TOKEN_SUCCESS, data: TokenResponseData } |
  { type: typeof ActionTypes.VALIDATE_TOKEN_FAILURE } |
  { type: typeof ActionTypes.USER_LOGOUT }
