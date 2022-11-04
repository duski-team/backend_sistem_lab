const {sq} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const bahan = require("./model");
const { QueryTypes } = require('sequelize');
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{nama_bahan,master_satuan_id}=req.body
        bahan.findAll({where:{
            nama_bahan,master_satuan_id
        }})
        .then(hasil1=>{
            if(hasil1.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                bahan.create({id:uuid_v4(),nama_bahan,master_satuan_id})
                .then(hasil2=>{
                    res.status(200).json({ status: 200, message: "sukses",data:hasil2.id})
                })
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static update(req,res){
        const{id,nama_bahan,master_satuan_id}=req.body
        bahan.update({nama_bahan,master_satuan_id},{where:{
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
        let data = await sq.query(`select mb.id as master_bahan_id,* from master_bahan mb join master_satuan ms on mb.master_satuan_id = ms.id
        where mb."deletedAt" isnull`,s)
        res.status(200).json({ status: 200, message: "sukses",data})
       } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "gagal", data: error})
       }
    }

    static async detailsById(req,res){
        const{id}=req.params
        try {
            let data = await sq.query(`select mb.id as master_bahan_id,* from master_bahan mb join master_satuan ms on mb.master_satuan_id = ms.id
            where mb."deletedAt" isnull and mb.id ='${id}'`,s)
            res.status(200).json({ status: 200, message: "sukses",data})
           } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
           }
    }

    static delete(req,res){
        const{id}=req.body
        bahan.destroy({where:{
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

}

module.exports = Controller;