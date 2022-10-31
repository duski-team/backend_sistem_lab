const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.get('/listPegawai',authentification,Controller.listPegawai);
router.get('/detailsPegawaiById/:id',authentification,Controller.detailsPegawaiById);
router.get('/detailsPegawaiByNIP/:NIP',authentification,Controller.detailsPegawaiByNIP);
module.exports = router