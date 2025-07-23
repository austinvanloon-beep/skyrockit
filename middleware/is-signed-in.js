const isSignedIn = (req, res, next) => {
    if (req.session.user) return next()
        res.direct('/auth/sign-in')
}

module.exports = isSignedIn