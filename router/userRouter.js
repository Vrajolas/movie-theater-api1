const express = require('express')
const { Show, User } = require('../models/index')
const router = express.Router()

//GET all users
router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users); 
})

//GET one user
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    res.json(user);
})

//GET all shows watched by a user
router.get('/users/:id/shows', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
        include: [{model: Show}]
    });
    res.json(user.Shows);
});

// PUT update and add a show if a user has watched it
router.put('/users/:id/shows', async (req, res) => {
    const userId = req.params.id;
    const showId = req.body.showId;

    const user = await User.findByPk(userId);
    const show = await Show.findByPk(showId);

    if (!user || !show) {
        return res.status(404).send('User or show not found');
    }

    const hasWatched = await user.hasWatched(show);
    if (!hasWatched) {
        await user.addShow(show);
    }

    res.send(`Show with ID ${showId} has been added to user with ID ${userId}`)
});

module.exports = router;