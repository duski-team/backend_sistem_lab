const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.get('/listWilayah',authentification,Controller.listWilayah);
router.get('/detailsWilayahById/:id',authentification,Controller.detailsWilayahById);
router.get('/listProdi',authentification,Controller.listProdi);
router.get('/detailsProdiById/:id',authentification,Controller.detailsProdiById);
router.get('/listFakultas',authentification,Controller.listFakultas);
router.get('/detailsFakultasById/:id',authentification,Controller.detailsFakultasById);
router.get('/detailsMahasiswaByNIM/:NIM',authentification,Controller.detailsMahasiswaByNIM);

module.exports = router