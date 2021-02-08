const userSignIn = (req, res) => {
  res.render('login')
}
const userSignUp = (req, res) => {
  console.log(req.cookies)
  res.cookie('user_id', 67)
  res.render('register')
}



module.exports = {
  userSignIn,
  userSignUp
}