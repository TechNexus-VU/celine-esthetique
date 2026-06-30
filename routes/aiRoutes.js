const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Routes ko controller se jorna
router.post('/chat', aiController.handleChat);
router.post('/aftercare', aiController.getAftercare);
router.post('/analyze-review', aiController.analyzeSentiment);
router.post('/skin-analyze', aiController.analyzeSkin);
router.post('/recommend-service', aiController.recommendService);
router.post('/price-estimate', aiController.estimatePrice);
router.post('/generate-nail-design', aiController.generateNailDesign);

module.exports = router;