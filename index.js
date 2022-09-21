const router = require("express").Router();

router.use('/prodi',require('./module/prodi/route'))
router.use('/masterUser',require('./module/master_user/route'))






module.exports = router;