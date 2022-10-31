const {simpeg,all}=require('../../config/connection')
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};



class Controller{
    static async listPegawai(req,res){
        try {
            let data = await all.query(`select mp.id as "master_pegawai_id", * from master_pegawai mp left join status_keaktifan_pegawai skp on skp.id = mp.status_aktif_id left join status_kepegawaian sk on sk.id = mp.status_kepegawaian_id left join agama a on a.id = mp.agama_id left join unit u on u.id = mp.unit_id left join unit2 u2 on u2.id = mp.unit2_id left join unit3 u3 on u3.id = mp.unit3_id where mp."deletedAt" isnull and skp."deletedAt" isnull order by mp."createdAt" desc`, s);
            res.status(200).json({ status: 200, message: "sukses",data:data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
      
    }

    static async detailsPegawaiById(req, res) {
        const { id } = req.params

        try {
            let data = await all.query(`select mp.id as "master_pegawai_id", * from master_pegawai mp left join status_keaktifan_pegawai skp on skp.id = mp.status_aktif_id left join status_kepegawaian sk on sk.id = mp.status_kepegawaian_id left join agama a on a.id = mp.agama_id left join unit u on u.id = mp.unit_id left join unit2 u2 on u2.id = mp.unit2_id left join unit3 u3 on u3.id = mp.unit3_id where mp."deletedAt" isnull and skp."deletedAt" isnull and mp.id = '${id}'`, s);

            res.status(200).json({ status: 200, message: "sukses", data });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }

    static async detailsPegawaiByNIP(req, res) {
        const { NIP } = req.params
        console.log(NIP);

        try {
            let data = await all.query(`select mp.id as "master_pegawai_id", * from master_pegawai mp left join status_keaktifan_pegawai skp on skp.id = mp.status_aktif_id left join status_kepegawaian sk on sk.id = mp.status_kepegawaian_id left join agama a on a.id = mp.agama_id left join unit u on u.id = mp.unit_id left join unit2 u2 on u2.id = mp.unit2_id left join unit3 u3 on u3.id = mp.unit3_id where mp."deletedAt" isnull and skp."deletedAt" isnull and mp."nip" = '${NIP}'`, s);

            res.status(200).json({ status: 200, message: "sukses", data });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }
}


module.exports=Controller