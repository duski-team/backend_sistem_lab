const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.get('/listWilayah',Controller.listWilayah);

module.exports = router