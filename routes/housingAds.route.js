var express = require('express');
var router = express.Router();

const {
  getAllHousingAds
} = require('../controllers/housingAds.controller');


/**
 * .get '/' : GET All Houfing Ads
 */
router.route('/')
    .get( getAllHousingAds)


module.exports = router;
