constr passUserToView = (req, res, next) => {
    res.locals.user = req.ression.user ? req.session.user : null
    next()
}

module.exports = passUserToView