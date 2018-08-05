const express = require('express');
const router = express.Router();
const ipMng = require('./controllers/ipMng');

router.get('/prev', ipMng.prev); 
router.get('/total', ipMng.total); 
router.get('/stats', ipMng.stats); 

module.exports = router;