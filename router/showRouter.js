const express = require('express')
const { Show, User } = require('../models/index')
const router = express.Router()

// GET all shows
router.get('/shows', async (req, res) => {
    try {
      const shows = await Show.find()
      res.json(shows)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// GET one show
router.get('/shows/:id', getShow, (req, res) => {
    res.json(res.show)
})

//GET shows of a particular genre
router.get('/shows/:genre', async (req, res) => {
    try {
      const shows = await Show.find({ genre: req.params.genre })
      res.json(shows)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// PUT update rating of a show that has been watched
router.put('/shows/:id/rating', getShow, async (req, res) => {
    if (req.body.rating != null) {
      res.show.rating = req.body.rating
    }

    //Server Side validation for rating being empty
    if (!rating) {
        return res.status(404).json({ message: "Rating cannot be empty or contain whitespace" });
    }

    try {
      const updatedShow = await res.show.save()
      res.json(updatedShow)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

// PUT update the status of a show
router.put('/shows/:id/status', getShow, async (req, res) => {
    if (req.body.status != null) {
      res.show.status = req.body.status
    }

    //Server side valiation for status of a show
    const {status} = req.body;
    if (!status || status.trim().length === 0) {
        return res.status(400).json({ message: 'Status cannot be empty or contain whitespace.' });
      }
      
    if (status.length < 5 || status.length > 25) {
        return res.status(400).json({ message: 'Status must be between 5 and 25 characters.' });
    }

    res.show.status = status;

    try {
      const updatedShow = await res.show.save()
      res.json(updatedShow)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

// DELETE a show
router.delete('/shows/:id', getShow, async (req, res) => {
    try {
      await res.show.remove()
      res.json({ message: 'Show deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})


module.exports = router;