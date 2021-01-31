import * as ActionTypes from '../actionTypes'
import axios from 'axios'
import { Dispatch } from 'redux'

export const fetchPosts = (dispatch: Dispatch<PostsAction>) => {
  dispatch({ type: ActionTypes.FETCH_POSTS_START })

  return axios.get(`${process.env.API_URL}/wp-json/wp/v2/posts?_embed`)
    .then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS_SUCCESS, posts: response.data })
    })
    .catch(error => {
      dispatch({ type: ActionTypes.FETCH_POSTS_FAILURE, error: error.toString() })
    })
}

export type PostsAction = |
  { type: typeof ActionTypes.FETCH_POSTS_START } |
  { type: typeof ActionTypes.FETCH_POSTS_SUCCESS, posts: Array<RawPost> } |
  { type: typeof ActionTypes.FETCH_POSTS_FAILURE, error: string }
