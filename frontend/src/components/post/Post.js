import React, { Component } from "react"
import { connect } from "react-redux"
import dayjs from "dayjs"
import PropTypes from "prop-types"

//Material UI
import withStyles from "@material-ui/core/styles/withStyles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

import DeletePost from "./DeletePost"
import LikeButton from "./LikeButton"

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
  },
  content: {
    padding: 10,
    objectFit: "cover",
  },
}

class Post extends Component {
  render() {
    const {
      classes,
      post: { postId, title, body, postedBy, createdAt, likeCount },
      user: {
        isAuthenticated,
        credentials: { username },
      },
    } = this.props

    const deleteButton =
      isAuthenticated && postedBy === username ? (
        <DeletePost postId={postId} />
      ) : null

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant='h5' color='primary'>
            {title}
          </Typography>
          {deleteButton}
          <Typography variant='body2'>
            Posted On {dayjs(createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <Typography variant='body2'>Posted By {postedBy}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
