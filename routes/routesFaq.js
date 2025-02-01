const express = require('express');
const router = express.Router();
const faqController = require('../controllers/controllersFaq');


router.route('/').get(faqController.getFaqs).post(faqController.createFaqs);
module.exports = router;