const express = require('express');
const router = express.Router();

/* GET tweets listing. */
router.post('/', requireUser, validateTweetInput, async (req, res, next) => {
  try {
    const newTweet = new Tweet({
      text: req.body.text,
      author: req.user._id
    });

    let tweet = await newTweet.save();
    tweet = await tweet.populate('author', '_id username');
    return res.json(tweet);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;