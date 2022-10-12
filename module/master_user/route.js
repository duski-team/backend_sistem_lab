const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.post('/register',authentification,Controller.register);
router.post('/update',authentification,Controller.update);
router.post('/delete',authentification,Controller.delete);
router.post('/listMasterUserByProdiId',authentification,Controller.listMasterUserByProdiId);
router.post('/list',Controller.list);
router.get('/listHalaman',authentification,Controller.listHalaman);
router.get('/detailsById/:id',authentification,Controller.detailsById);
router.get('/cekUser',authentification,Controller.cekUser);

module.exports = router