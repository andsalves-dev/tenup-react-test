import React from 'react'
import { bareClass as HomePage } from '../index'
import { shallow } from 'enzyme'
import { buildBaseUser, buildPost } from 'util/test-utils'

describe('pages::Home', () => {
  const defaults = {
    fetchPosts: jest.fn(),
    hasError: false,
    isLoading: false,
    posts: [buildPost()],
    user: buildBaseUser(),
  }

  beforeEach(() => jest.clearAllMocks())

  it('renders a Page', () => {
    const tree = shallow(<HomePage {...defaults} />)
    expect(tree.find('Page').exists()).toBe(true)
  })

  it('renders a loading state', () => {
    const tree = shallow(<HomePage {...defaults} />)
    expect(tree.find('[data-qa="loadingMessage"]').exists()).toBe(false)
    tree.setProps({ isLoading: true })
    expect(tree.find('[data-qa="loadingMessage"]').exists()).toBe(true)
  })

  it('renders an error state', () => {
    const tree = shallow(<HomePage {...defaults} />)
    expect(tree.find('[data-qa="errorMessage"]').exists()).toBe(false)
    tree.setProps({ hasError: true })
    expect(tree.find('[data-qa="errorMessage"]').exists()).toBe(true)
  })

  it('renders an empty state', () => {
    const tree = shallow(<HomePage {...defaults} />)
    expect(tree.find('[data-qa="noPostsMessage"]').exists()).toBe(false)
    tree.setProps({ posts: [] })
    expect(tree.find('[data-qa="noPostsMessage"]').exists()).toBe(true)
  })

  it('renders the posts list', () => {
    const tree = shallow(<HomePage {...defaults} />)
    expect(tree.find('[data-qa="postItem"]')).toHaveLength(1)
    tree.setProps({
      posts: [
        ...defaults.posts,
        buildPost({ id: 2, title: 'Post 2' })
      ]
    })
    expect(tree.find('[data-qa="postItem"]')).toHaveLength(2)
  })

  it('fetches the posts on mount if not fetched yet', () => {
    shallow(<HomePage {...defaults} posts={[]} />)
    expect(defaults.fetchPosts).toHaveBeenCalledTimes(1)
  })
})