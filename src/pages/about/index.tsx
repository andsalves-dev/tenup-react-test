import React from 'react'
import { connect } from 'react-redux'
import Page from 'components/page'
import { Dispatch } from 'redux'
import { fetchPages } from 'state/actions/pages'

type StateProps = {
  fetchPages: () => void
  hasError: boolean
  isLoading: boolean
  pages: Array<PagePost>
}

class About extends React.PureComponent<StateProps> {
  componentDidMount() {
    if (!this.getAboutPage()) {
      this.props.fetchPages()
    }
  }

  render() {
    return (
      <Page title="10up Blog - About">
        <h1>About</h1>
        {this.renderContent()}
      </Page>
    )
  }

  renderContent = () => {
    const { isLoading, hasError } = this.props
    const page = this.getAboutPage()

    if (isLoading) {
      return (
        <span data-qa="loadingMessage">Loading...</span>
      )
    }

    if (hasError) {
      return (
        <h2 data-qa="errorMessage">Error loading page data</h2>
      )
    }

    return (
      <div className="page" data-qa="pageContent">
        <div dangerouslySetInnerHTML={{ __html: (page && page.content.rendered) || '' }} />
      </div>
    )
  }

  getAboutPage = (): PagePost | null => {
    const { pages } = this.props
    return pages.find(page => page.slug === 'about-us') || null
  }
}

const mapStateToProps = (state: AppState) => ({
  pages: state.pagesState.pages,
  isLoading: ['UNSENT', 'LOADING'].includes(state.pagesState.fetchState),
  hasError: state.pagesState.fetchState === 'ERROR',
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPages: () => fetchPages(dispatch)
})

export const bareClass = About
export default connect(mapStateToProps, mapDispatchToProps)(About)
