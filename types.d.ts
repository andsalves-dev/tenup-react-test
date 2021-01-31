import RootReducer from 'state/reducers'

// Definition for css modules use
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare global {
  type AppState = ReturnType<typeof RootReducer>
  type FetchState = 'UNSENT' | 'LOADING' | 'DONE' | 'ERROR'
  type RawPost = {
    id: number
    excerpt: { rendered: string }
    link: string
    title: { rendered: string }
    date: string
    _embedded: { author: Array<{ name: string; link: string }> }
  }

  type Post = {
    id: number
    excerpt: string
    link: string
    title: string
    date: Date
    author: { name: string, link: string }
  }

  type PagePost = {
    id: number
    slug: string
    content: { rendered: string }
  }

  type TokenResponseData = {
    token: string
    user_email: string
    user_display_name: string
  }

  type BaseUser = {
    name: string
    email: string
  }

  type LoginData = {
    username: string
    password: string
  }
}