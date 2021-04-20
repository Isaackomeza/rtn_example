var express = require ('express');
var router = express.Router();
var regionController = require ('../controllers/regionController')
const { body, validationResult } = require('express-validator');

/*
 * Serve the input form, including data for the first layer (province).
 */
router.get ('/', (req, res) => {
  regionController.getRegionData (0, data => {
    res.render ('form', {provinces: data});
  });
});

/*
 * Load additional region data from the server by specifying the layer
 * 0 (province) up to 4 (village) and an array of values for
 * the already specified layers.
 * e.g.: layer: 2, params: ['Kigali', 'Gasabo']
 */
router.post ('/regions', 
body().notEmpty(),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  regionController.getRegionData (req.body.layer, req.body.params, result => {
    res.json (result);
  });
});

/*
 * Submit the form: display all submitted data in the result view.
 */
router.post ('/submit', (req, res) => {
  res.render ('result', {data: req.body});
});

module.exports = router;
