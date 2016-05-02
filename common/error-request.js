module.exports = (res, error) => {
    console.log(error);
    res.status(500).send({
        err: error
    })
}