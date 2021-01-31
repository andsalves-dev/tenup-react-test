import * as ActionTypes from 'state/actionTypes'
import { PostsAction } from 'state/actions/posts'

type State = {
  posts: Array<Post>
  fetchState: FetchState
  error: string | null
}

const initialState: State = {
  posts: [],
  fetchState: 'UNSENT',
  error: null
}

export default (state: State = initialState, action: PostsAction): State => {
  switch(action.type) {
    case ActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        fetchState: 'LOADING',
        error: null,
      }
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts.map(mapRawPostToPost) || [],
        fetchState: 'DONE',
        error: null,
      }
    case ActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        fetchState: 'ERROR',
        error: action.error
      }
  }

  return state
}

function mapRawPostToPost(rawPost: RawPost): Post {
  return {
    id: rawPost.id,
    excerpt: rawPost.excerpt.rendered,
    link: rawPost.link,
    title: rawPost.title.rendered,
    date: new Date(rawPost.date),
    author: {
      name: rawPost._embedded?.author[0]?.name || 'Undefined',
      link: rawPost._embedded?.author[0]?.link || '#'
    },
  }
}
