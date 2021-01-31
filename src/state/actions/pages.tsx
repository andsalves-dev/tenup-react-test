import * as ActionTypes from '../actionTypes'
import axios from 'axios'
import { Dispatch } from 'redux'

export const fetchPages = (dispatch: Dispatch<PagesAction>) => {
  dispatch({ type: ActionTypes.FETCH_PAGES_START })

  return axios.get(`${process.env.API_URL}/wp-json/wp/v2/pages`)
    .then(response => {
      dispatch({ type: ActionTypes.FETCH_PAGES_SUCCESS, pages: response.data })
    })
    .catch(error => {
      dispatch({ type: ActionTypes.FETCH_PAGES_FAILURE, error: error.toString() })
    })
}

export type PagesAction = |
  { type: typeof ActionTypes.FETCH_PAGES_START } |
  { type: typeof ActionTypes.FETCH_PAGES_SUCCESS, pages: Array<PagePost> } |
  { type: typeof ActionTypes.FETCH_PAGES_FAILURE, error: string }
