import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"

import Post from "../components/post/Post"
import PostSkeleton from "../utils/PostSkeleton"
import { getPosts } from "../redux/actions/dataAction"

export class home extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.data

    let recentPosts = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    )

    return (
      <Grid container>
        <Grid item sm>
          {recentPosts}
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps, { getPosts })(home)
