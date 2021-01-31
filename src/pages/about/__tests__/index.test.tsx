import React from 'react'
import { bareClass as AboutPage } from '../index'
import { shallow } from 'enzyme'
import { buildPagePost } from 'util/test-utils'

describe('pages::About', () => {
  const defaults = {
    fetchPages: jest.fn(),
    hasError: false,
    isLoading: false,
    pages: [
      buildPagePost({ slug: 'about-us' })
    ],
  }

  beforeEach(() => jest.clearAllMocks())

  it('renders a Page', () => {
    const tree = shallow(<AboutPage {...defaults} />)
    expect(tree.find('Page').exists()).toBe(true)
  })

  it('renders the page content', () => {
    const tree = shallow(<AboutPage {...defaults} />)
    expect(tree.find('[data-qa="pageContent"]').exists()).toBe(true)
  })

  it('renders a loading state', () => {
    const tree = shallow(<AboutPage {...defaults} />)
    expect(tree.find('[data-qa="loadingMessage"]').exists()).toBe(false)
    tree.setProps({ isLoading: true })
    expect(tree.find('[data-qa="loadingMessage"]').exists()).toBe(true)
    expect(tree.find('[data-qa="pageContent"]').exists()).toBe(false)
  })

  it('renders an error state', () => {
    const tree = shallow(<AboutPage {...defaults} />)
    expect(tree.find('[data-qa="errorMessage"]').exists()).toBe(false)
    tree.setProps({ hasError: true })
    expect(tree.find('[data-qa="errorMessage"]').exists()).toBe(true)
    expect(tree.find('[data-qa="pageContent"]').exists()).toBe(false)
  })

  it('fetches page on mount if not fetched yet', () => {
    shallow(<AboutPage {...defaults} pages={[]} />)
    expect(defaults.fetchPages).toHaveBeenCalledTimes(1)
  })
})