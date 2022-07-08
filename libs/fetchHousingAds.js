const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'http://feeds.spotahome.com/ads-housinganywhere.json';
const settings = {method: 'Get'};
const fs = require('fs');


const fetchData = async () => {

    try {
        console.log('Solicitando datos JSON a url...');
        const response = await fetch(url, settings);
        console.log('Obteniendo respuesta...')
        const dataJson = await response.json();
        console.log('Parseando datos JSON y generando archivo...')
        
        fs.writeFileSync('housingAds.json', JSON.stringify(dataJson));

        return true;

    } catch (error) {
        console.log(error);
    }
};


module.exports = fetchData;