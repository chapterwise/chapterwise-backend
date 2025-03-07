const { adminRoleConst, errorMessage401AuthIssue } = require('../utils/constants');

function isAdminRole(req, res, next) {
    try {
        const {role} = req.user;
        if(role != adminRoleConst){
            res.status(401).json({ error: errorMessage401AuthIssue })
        }
        next();
    } catch (error) {
        res.status(401).json({ error: errorMessage401AuthIssue });
    }
};

module.exports = isAdminRole;
