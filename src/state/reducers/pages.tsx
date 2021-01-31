import * as ActionTypes from 'state/actionTypes'
import { PagesAction } from 'state/actions/pages'

type State = {
  pages: Array<PagePost>
  fetchState: FetchState
  error: string | null
}

const initialState: State = {
  pages: [],
  fetchState: 'UNSENT',
  error: null
}

export default (state: State = initialState, action: PagesAction): State => {
  switch(action.type) {
    case ActionTypes.FETCH_PAGES_START:
      return {
        ...state,
        fetchState: 'LOADING',
        error: null,
      }
    case ActionTypes.FETCH_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.pages || [],
        fetchState: 'DONE',
        error: null,
      }
    case ActionTypes.FETCH_PAGES_FAILURE:
      return {
        ...state,
        fetchState: 'ERROR',
        error: action.error
      }
  }

  return state
}
