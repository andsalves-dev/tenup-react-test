import {createBrowserHistory, createLocation} from 'history'
import {matchPath, RouteComponentProps} from 'react-router'

export const buildPagePost = (override: Partial<PagePost> = {}): PagePost => ({
  ...override,
  id: 1,
  slug: 'my-page',
  content: { rendered: 'Page content string' },
})

export const buildPost = (override: Partial<Post> = {}): Post => ({
  ...override,
  id: 10,
  excerpt: 'I am the night',
  link: 'http://google.com',
  title: 'Batman',
  date: new Date(),
  author: { name: 'Barry', link: 'http://google.com/author' },
})

export const buildBaseUser = (override: Partial<BaseUser> = {}) => ({
  ...override,
  name: 'Jane',
  email: 'janedoe@mail.com',
})

export const buildRouteComponentProps = (path: string) => ({
  history: createBrowserHistory(),
  location: createLocation(path),
  match: matchPath(path, '')
})
