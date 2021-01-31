import React from 'react'
import Page from 'components/page'

export default class NotFound extends React.PureComponent {
  render() {
    return (
      <Page title="10up Blog - Not Found">
        <h1>
          404! <br />
          <small>Oh noes, page not found.</small>
        </h1>
      </Page>
    )
  }
}