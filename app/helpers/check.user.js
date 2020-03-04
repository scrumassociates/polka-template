exports.checkUser = (req, res) => {
    if (!req.userInfo) {
        res.status(401).send({ message: "Not logged in." });
    }
};
