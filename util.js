exports.checkLogin = function(req, res, next) {
    if (!req.session.user) {
        return res.sendStatus(401);
    }
    next();
}
exports.checkNotLogin = function(req, res, next) {
    if (req.session.user) {
        return res.status(409).send("You already logged in!");
    }
    next();
}