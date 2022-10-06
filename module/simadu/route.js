const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.get('/listWilayah',Controller.listWilayah);
router.get('/detailsWilayahById/:id',Controller.detailsWilayahById);

module.exports = router