import { combineReducers } from 'redux'
import pages from './pages'
import posts from './posts'
import user from './user'

export default combineReducers({
  pagesState: pages,
  postsState: posts,
  userState: user,
})
