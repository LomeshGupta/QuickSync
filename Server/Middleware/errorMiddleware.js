const errorHandler = (err, req, res, next) => {
    const statuCode = res.statuCode ? res.statuCode : 500;
    res.status(statuCode);
    res.json({
        message :err.message,
        stack : process.env.NODE_ENV === "development" ? err.stack : null,
    });
};

module.exports = errorHandler;