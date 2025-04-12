const renderLoginPage = (req, res) => {
    res.status(200).render("login")
}

module.exports = {
    renderLoginPage
}