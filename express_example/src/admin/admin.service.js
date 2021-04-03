const {Forbidden} = require('http-errors');
const util = require('../commons/util');
const userService = require('../users/users.service');

class AdminService {
    async unlockUser(req, id) {
        if (req.user.role !== util.ADMIN) {
            throw Forbidden('Not authorized!');
        }
        let user = await userService.findOne(id);
        user.isLocked = false;
        user.attempts = 0;
        await user.save();
    }

    async lockUser(req, id) {
        if (req.user.role !== util.ADMIN) {
            throw Forbidden('Not authorized!');
        }
        let user = await userService.findOne(id);
        user.isLocked = true;
        await user.save();
    }
}

module.exports = new AdminService();