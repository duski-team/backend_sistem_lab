const router = require("express").Router();

router.use('/prodi',require('./module/prodi/route'))
router.use('/masterUser',require('./module/master_user/route'))
router.use('/kategoriBarang',require('./module/kategori_barang/route'))
router.use('/masterMerk',require('./module/master_merk/route'))






module.exports = router;