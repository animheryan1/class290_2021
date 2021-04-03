const User = require('../users/user.entity');
const userService = require('../users/users.service');
const {Unauthorized, Locked} = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async validate(username, password) {
        const user = await User.findOne({username});
        if (!user || !bcrypt.compareSync(password, user.password)) {
            user && await userService.addAttempt(username);
            throw new Unauthorized();
        }

        return user;
    }

    async login(username, password) {

        if (await userService.isLocked(username)) {
            throw new Locked("The user is locked!");
        }

        let user = await this.validate(username, password);

        const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        userService.resetAttempts(user);
        return token;
    }

    validateToken(token) {
        const obj = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false
        })

        return {userId: obj.userId, username: obj.username};
    }
}

module.exports = new AuthService();