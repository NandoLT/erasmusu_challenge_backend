    const mongoose = require('mongoose');
const { Schema } = mongoose;

const housingAdsSchema = new Schema({
    link:       {type: String, required: true},
    address:    {type: String, required: true, index: true},
    city:       {type: String, required: true, index: true},
    image:      {type: String, required: true}
}, { versionKey: false });

const housingAds = mongoose.model('housingAds', housingAdsSchema);

module.exports = housingAds;