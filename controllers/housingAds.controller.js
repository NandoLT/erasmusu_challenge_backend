const housingAds = require('../models/housingAds.model');


class housingController {

    getAllHousingAds = async (req, res, next) => {
        let limit = req.query.limit
        const orderType = req.query.type;
        const field = req.query.orderby;
        if((limit.length === 0) ){
            limit = 100;
        }
        if(parseInt(limit) <= 0){
            limit = 100;
        }
        if(parseInt(limit) > 100){
            limit = 100;
        }

        const skip = req.query.skip.length > 0 ? parseInt(req.query.skip) : 1;

        const sortFilter = {
            [field]: orderType,
        }

        try {
            const totalDocuments = await housingAds.countDocuments(); 
            const ads = await housingAds.find({}).limit(limit).skip(limit*skip).sort(sortFilter);

            res.json({ 
                result:ads,
                documents: totalDocuments    
            })
        } catch (error) {
            next(error);
        }
        
    }
}

module.exports = new housingController;