const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const master_alat = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{nama_alat,master_merk_id,jenis_alat2_id}=req.body
        master_alat.findAll({where:{
            nama_alat,master_merk_id,jenis_alat2_id
        }})
        .then(async hasil=>{
            await master_alat.create({id:uuid_v4(),nama_alat,master_merk_id,jenis_alat2_id})
            .then(hasil2=>{
                res.status(200).json({ status: 200, message: "sukses",data:hasil2})
            })
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })

    }

    static update(req,res){
        const{id,nama_alat,master_merk_id,jenis_alat2_id}=req.body
        master_alat.update({nama_alat,master_merk_id,jenis_alat2_id},{where:{
            id
        }})
        .then(hasil=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static delete(req,res){
        const{id}=req.body
        master_alat.destroy({where:{id}})
        .then(hasil=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static async list(req,res){
        try {
            let data = await sq.query(`select ma.id as master_alat_id,* from master_alat ma 
            join master_jenis_alat2 mja2 on ma.jenis_alat2_id =mja2.id 
            join master_jenis_alat1 mja on mja2.jenis_alat1_id =mja.id
            left join master_merk mm on mm.id = ma.master_merk_id 
            where ma."deletedAt" isnull `,s)
            res.status(200).json({ status: 200, message: "sukses",data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsById(req,res){
        const{id}=req.params
        try {
            let data = await sq.query(`select ma.id as master_alat_id,* from master_alat ma 
            join master_jenis_alat2 mja2 on ma.jenis_alat2_id =mja2.id 
            join master_jenis_alat1 mja on mja2.jenis_alat1_id =mja.id
            left join master_merk mm on mm.id = ma.master_merk_id 
            where ma."deletedAt" isnull and ma.id='${id}'`,s)
            res.status(200).json({ status: 200, message: "sukses",data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

}

module.exports=Controller