import React from 'react'
import { bareClass as LoginPage } from '../index'
import { shallow } from 'enzyme'
import { buildRouteComponentProps } from 'util/test-utils'

describe('pages::Login', () => {
  const defaults = {
    hasError: false,
    isLoading: false,
    requestToken: jest.fn(() => Promise.resolve()),
    ...buildRouteComponentProps('/login'),
  }

  beforeEach(() => jest.clearAllMocks())

  it('renders a Page', () => {
    const tree = shallow(<LoginPage {...defaults} />)
    expect(tree.find('Page').exists()).toBe(true)
  })

  it('submits form data', () => {
    window.alert = jest.fn();
    const formData = {
      username: 'john',
      password: '123456',
    }
    const tree = shallow(<LoginPage {...defaults} />)
    tree.find('[data-qa="usernameInput"]').simulate('change', {
      target: { id: 'username', value: formData.username }
    })
    tree.find('[data-qa="passwordInput"]').simulate('change', {
      target: { id: 'password', value: formData.password }
    })

    expect(defaults.requestToken).not.toHaveBeenCalled()
    tree.find('form').simulate('submit', { preventDefault: jest.fn() })
    expect(defaults.requestToken).toHaveBeenCalledWith(formData)
  })


})