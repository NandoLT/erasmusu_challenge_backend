
const mongoose = require('mongoose');
const housingAds = require('../models/housingAds.model');
const path = require('path');
const fs = require('fs');


const initDbProcess = async ({advertsData}) => {
    const responseAdverts = await initData(advertsData);
    dropChargeBd(responseAdverts);
}

const initData = async (dataToParse) => {
    const data = fs.readFileSync(dataToParse, 'utf8');
    const dataParse = await JSON.parse(data);
    const reducedataParse = dataParse.map(item => {
        const {Link, Address, City, Images} = item;
        return {
            link:Link,
            address:Address,
            city:City,
            image:Images[0] ? Images[0] : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png'
        }
    })
    return reducedataParse;
}


const dropChargeBd =  async (advertsData) => {
    try {
        
        await housingAds.deleteMany({})
        console.log('Collection housingAds deleted...')
        await housingAds.insertMany(advertsData)
        console.log(`Data housingAds inserted`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = initDbProcess;
