function two(req, res, next) {
    req.foo = '...needs better demo 😔';
    next();
};

module.exports = two;