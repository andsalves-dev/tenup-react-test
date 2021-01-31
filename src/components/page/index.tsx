import React, { PureComponent } from 'react'
import Header from 'components/header'

type Props = {
  title: string
}

export default class Page extends PureComponent<Props> {
  componentDidMount() {
    document.title = this.props.title
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
