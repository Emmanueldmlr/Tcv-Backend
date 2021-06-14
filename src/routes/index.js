const express = require('express');

const router = express.Router();

const category = require('./category')

const event = require('./event')

router.get('/', (req, res) => {

  res.json({

    message: 'Homepage'

  });
  
});

router.use('/categories', category)

router.use('/events', event)


module.exports = router;
