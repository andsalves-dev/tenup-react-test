import React from 'react'
import { connect } from 'react-redux'
import Page from 'components/page'
import { fetchPosts } from 'state/actions/posts'
import { Dispatch } from 'redux'

type StateProps = {
  fetchPosts: () => void
  hasError: boolean
  isLoading: boolean
  posts: Array<Post>
  user: BaseUser
}

class Home extends React.PureComponent<StateProps> {
  static defaultProps: Partial<StateProps> = {
    isLoading: true,
    posts: [],
  }

  componentDidMount() {
    const { fetchPosts, posts } = this.props

    if (!posts.length) {
      fetchPosts()
    }
  }

  render() {
    const { user } = this.props

    return (
      <Page title="10up Blog">
        {user && (
          <section className="welcome logged-in">
            Welcome {user.name}!
          </section>
        )}
        {this.renderContent()}
      </Page>
    )
  }

  renderContent = () => {
    const { isLoading, hasError, posts } = this.props

    if (isLoading) {
      return (
        <span data-qa="loadingMessage">Loading...</span>
      )
    }

    if (hasError) {
      return (
        <h2 data-qa="errorMessage">Error loading posts data</h2>
      )
    }

    if (!posts.length) {
      return (
        <h2 data-qa="noPostsMessage">No posts available</h2>
      )
    }

    return (
      <div itemScope itemType="https://schema.org/Blog">
        {posts.map((post, key) => (
          <article itemScope itemType="http://schema.org/BlogPosting" className="post" key={key} data-qa="postItem">
            <header>
              <a href={post.link} target="_blank">
                <h2
                  itemProp="headline"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </a>
              <div className="date">
                <strong>Publish Date: </strong>&nbsp;
                <span itemProp="datePublished">
                  <time dateTime={post.date.toString()}>
                    {`${post.date.toLocaleString('default', { month: 'long' })} ${post.date.getDate()}, ${post.date.getFullYear()}`}
                  </time>
                </span>
              </div>
              <div className="author">
                <strong>Author:</strong>&nbsp;
                <a href={post.author.link} target="_blank">
                  <span itemProp="author">{post.author.name}</span>
                </a>
              </div>
            </header>
            <div
              itemProp="articleBody"
              className="content"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </article>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  posts: state.postsState.posts,
  isLoading: ['UNSENT', 'LOADING'].includes(state.postsState.fetchState),
  hasError: state.postsState.fetchState === 'ERROR',
  user: state.userState.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPosts: () => fetchPosts(dispatch),
})

export const bareClass = Home
export default connect(mapStateToProps, mapDispatchToProps)(Home)
