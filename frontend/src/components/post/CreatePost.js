import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

//Material UI
import withStyles from "@material-ui/core/styles/withStyles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

import { createPost, clearErrors } from "../../redux/actions/dataAction"
import MyButton from "../../utils/MyButton"

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
})

class CreatePost extends Component {
  state = {
    open: false,
    title: "",
    body: "",
    errors: {},
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ title: "", body: "", open: false, errors: {} })
    }
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.props.clearErrors()
    this.setState({ open: false, errors: {} })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createPost({ title: this.state.title, body: this.state.body })
  }
  render() {
    const { errors } = this.state
    const {
      classes,
      UI: { loading },
    } = this.props
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='Create a Post!'>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='title'
                name='title'
                type='text'
                label='Title'
                className={classes.textField}
                helperText={errors.title}
                error={errors.title ? true : false}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='body'
                type='text'
                label='New Post'
                multiline
                rows='3'
                placeholder='Write here...'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />

              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { createPost, clearErrors })(
  withStyles(styles)(CreatePost)
)
