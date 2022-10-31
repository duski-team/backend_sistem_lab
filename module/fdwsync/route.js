const Controller = require( './controller' );
const router = require( 'express' ).Router();
const authentification = require('../../middleware/authentification');

router.post('/fdwSyncTable',Controller.fdwSyncTable);


module.exports=router