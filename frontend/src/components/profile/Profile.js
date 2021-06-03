import React from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"

// Material UI
import withStyles from "@material-ui/core/styles/withStyles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

// Icons
import CalendarToday from "@material-ui/icons/CalendarToday"

const styles = (theme) => ({
  ...theme.spreadIt,
})

const StaticProfile = (props) => {
  const {
    classes,
    profile: { username, createdAt },
  } = props

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='profile-details'>
          <Typography>{username}</Typography>
          <CalendarToday color='primary' />{" "}
          <span>Member since {dayjs(createdAt).format("DD MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  )
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile)
