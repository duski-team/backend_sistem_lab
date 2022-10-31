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
        const{id,nama_bahan}=req.body
        bahan.update({nama_bahan},{where:{
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

    static list(req,res){
        bahan.findAll({})
        .then(hasil=>{
            res.status(200).json({ status: 200, message: "sukses",data:hasil})
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static detailsById(req,res){
        const{id}=req.params
        bahan.findAll({where:{
            id
        }})
        .then(hasil=>{
            res.status(200).json({ status: 200, message: "sukses",data:hasil})
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
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