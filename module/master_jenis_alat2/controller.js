const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const master_jenis_alat2 = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller{

    static register(req,res){
        const {jenis_alat1_id,nama_jenis_alat2}=req.body
        
        master_jenis_alat2.findAll({where:{
            jenis_alat1_id,nama_jenis_alat2
        }})
        .then(async hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                await master_jenis_alat2.create({id:uuid_v4(),jenis_alat1_id,nama_jenis_alat2})
                .then(hasil2=>{
                    res.status(200).json({ status: 200, message: "sukses",data:hasil2})
                })
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static update(req,res){
        const {id,jenis_alat1_id,nama_jenis_alat2}=req.body
        master_jenis_alat2.update({jenis_alat1_id,nama_jenis_alat2},{where:{
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
        master_jenis_alat2.destroy({where:{
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

    static async list(req,res){
        try {
            let data = await sq.query(`select mja2.id as master_jenis_alat2_id,* from master_jenis_alat2 mja2 join master_jenis_alat1 mja1 on mja2.jenis_alat1_id = mja1.id where mja2."deletedAt" isnull`,s)
            res.status(200).json({ status: 200, message: "sukses",data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsById(req,res){
        const{id}=req.params
        try {
            let data = await sq.query(`select mja2.id as master_jenis_alat2_id,* from master_jenis_alat2 mja2 join master_jenis_alat1 mja1 on mja2.jenis_alat1_id = mja1.id where mja2."deletedAt" isnull and mja2.id='${id}'`,s)
            res.status(200).json({ status: 200, message: "sukses",data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

}

module.exports=Controller