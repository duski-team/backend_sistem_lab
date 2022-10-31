const router = require("express").Router();

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
router.use('/simpeg',require('./module/simpeg/route'))
router.use('/poolLaboran',require('./module/pool_laboran/route'))
router.use('/fdwSync',require('./module/fdwSync/route'))
router.use('/booking',require('./module/booking/route'))
router.use('/jenisBahan',require('./module/jenis_bahan/route'))
router.use('/master_jenis_alat1',require('./module/master_jenis_alat1/route'))
router.use('/master_jenis_alat2',require('./module/master_jenis_alat2/route'))






module.exports = router;