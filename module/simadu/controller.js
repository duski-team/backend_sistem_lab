const {simadu,all}=require('../../config/connection')
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static async listWilayah(req,res){
        try {
            let data = await simadu.query(`select * from wilayah w where w."deletedAt" isnull  `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(req.body)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsWilayahById(req,res){
        const{id}=req.params
        try {
            let data = await simadu.query(`select * from wilayah w where w."deletedAt" isnull and w.id = '${id}' `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async listProdi(req,res){
        try {
            let data = await simadu.query(`select * from prodi p  where p."deletedAt" isnull `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsProdiById(req,res){
        const{id}=req.params
        try {
            let data = await simadu.query(`select * from prodi p  where p."deletedAt" isnull and p.id ='${id}'`,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async listFakultas(req,res){
        try {
            let data = await simadu.query(`select * from fakultas f where f."deletedAt" isnull  `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsFakultasById(req,res){
        const{id}=req.params
        try {
            let data = await simadu.query(`select * from fakultas f where f."deletedAt" isnull and f.id ='${id}'  `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsMahasiswaByNIM(req,res){
        const{NIM}=req.params
        console.log(NIM);
        try {
            let data = await simadu.query(`select rm.id as registrasi_mahasiswa_id,rm.*,mbm.nama_mahasiswa,p.nama_program_studi_prodi,f.nama_fakultas from registrasi_mahasiswa rm
            join master_biodata_mahasiswa mbm on mbm.id =rm.biodata_mahasiswa_id 
            join prodi p on p.id = rm.prodi_id 
            join fakultas f on f.id=p.fakultas_id 
            where rm."NIM" ='${NIM}'`,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }
}

module.exports=Controller