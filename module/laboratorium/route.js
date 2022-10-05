const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.post('/register',Controller.register);
router.post('/update',Controller.update);
router.post('/delete',Controller.delete);
router.get('/list',Controller.list);
router.get('/detailsById/:id',Controller.detailsById);

module.exports = router