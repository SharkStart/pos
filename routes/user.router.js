const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
  res.send('saludando desde user router');
});


module.exports = router;