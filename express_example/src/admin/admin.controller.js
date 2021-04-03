const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const adminService = require('../admin/admin.service');

router.patch('/unlock-user/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    await adminService.unlockUser(req, id);
    res.json({"message": "User has successfully been unlocked!"})
}));

router.patch('/lock-user/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    await adminService.lockUser(req, id);
    res.json({"message": "User has successfully been locked!"})
}))

module.exports = router;