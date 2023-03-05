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