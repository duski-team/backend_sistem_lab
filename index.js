const router = require("express").Router();

router.use('/prodi',require('./module/prodi/route'))
router.use('/masterUser',require('./module/master_user/route'))
router.use('/tipeBarang',require('./module/tipe_barang/route'))






module.exports = router;