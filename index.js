const router = require("express").Router();

router.use('/prodi',require('./module/prodi/route'))
router.use('/masterUser',require('./module/master_user/route'))
// router.use('/tipeBarang',require('./module/tipe_barang/route'))
router.use('/jenisLab',require('./module/jenis_lab/route'))
router.use('/kampus',require('./module/kampus/route'))
router.use('/poolKampusProdi',require('./module/pool_kampus_prodi/route'))
router.use('/poolKampusFakultas',require('./module/pool_kampus_fakultas/route'))
router.use('/laboratorium',require('./module/laboratorium/route'))
router.use('/kategoriBarang',require('./module/kategori_barang/route'))
router.use('/masterMerk',require('./module/master_merk/route'))
router.use('/simadu',require('./module/simadu/route'))






module.exports = router;