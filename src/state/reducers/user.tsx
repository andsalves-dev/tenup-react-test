import * as ActionTypes from 'state/actionTypes'
import { UserAction } from 'state/actions/user'

type State = {
  error: string | null
  fetchState: FetchState
  token: string | null
  user: BaseUser | null
}

const initialState: State = {
  error: null,
  fetchState: 'UNSENT',
  token: null,
  user: null,
}

export default (state: State = initialState, action: UserAction): State => {
  switch(action.type) {
    case ActionTypes.VALIDATE_TOKEN_START:
    case ActionTypes.REQUEST_TOKEN_START:
      return {
        ...state,
        error: null,
        fetchState: 'LOADING',
      }
    case ActionTypes.REQUEST_TOKEN_SUCCESS:
    case ActionTypes.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        error: null,
        fetchState: 'DONE',
        token: action.data.token,
        user: mapTokenDataToUser(action.data),
      }
    case ActionTypes.REQUEST_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error,
        fetchState: 'ERROR',
      }
    case ActionTypes.VALIDATE_TOKEN_FAILURE:
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        fetchState: 'DONE',
        token: null,
        user: null,
      }
  }

  return state
}

function mapTokenDataToUser(tokenData: TokenResponseData): BaseUser {
  return {
    email: tokenData.user_email,
    name: tokenData.user_display_name,
  }
}
