module.exports = (req, res, next) => {
    res.status = (code) => {
        res.statusCode = code;
        return res;
    }
    res.send = (data) => {
        res.end(JSON.stringify(data));
    }
    next();
};
