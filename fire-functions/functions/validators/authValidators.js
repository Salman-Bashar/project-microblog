const isEmpty = (userInput) => {
  if (userInput.trim() === "") return true
  else return false
}

const isEmail = (email) => {
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (isEmail.match(emailRegEx)) return true
  else return false
}

//Sign Up Validation
exports.validateSignUpData = (data) => {
  let errors = {}

  if (isEmpty(data.email)) {
    errors.email = "Email is required"
  } else if (!isEmail) {
    errors.email = "Invalid email address"
  }

  if (isEmpty(data.password)) errors.password = "Password is required"

  if (isEmpty(data.username)) errors.username = "Username is required"

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}

//Login Validation
exports.validateLogInData = (data) => {
  let errors = {}

  if (isEmpty(data.email)) errors.email = "Email is required"
  if (isEmpty(data.password)) errors.password = "Password is required"

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
