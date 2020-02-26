function one(req, res, next) {
    req.hello = 'world';
    next();
};

module.exports = one;