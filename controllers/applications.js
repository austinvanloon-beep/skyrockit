const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


// GET route for /new

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id) // also remove that extra period after _id
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})



// POST fpr /applictions
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.applications.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/applications`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


// GET to /applications/:appliucationId
router.get('/:applicationId', (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        res.render('applications/show.ejs', {
            application: application,
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})



// DELETE /application/:applicationId
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.applications.id(req.params.applicationId).deleteOne()
        currentUser.save()
        res.redirect(`/users/${currentUserUser._id}/applications`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


// controllers/applications.js

router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.put('/:applicationId', async (req, res) => => {
    try {
        const currentUser = await User.finById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        application.set(req.body)
        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/applications${req.params.applicationId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router