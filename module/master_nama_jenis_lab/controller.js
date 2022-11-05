const {sq} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const master_nama_jenis_lab = require("./model");
const { QueryTypes } = require('sequelize');
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{nama_jenis_lab}=req.body
        master_nama_jenis_lab.findAll({where:{
            nama_jenis_lab
        }})
        .then(hasil1=>{
            if(hasil1.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                master_nama_jenis_lab.create({id:uuid_v4(),nama_jenis_lab})
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
        const{id,nama_jenis_lab}=req.body
        master_nama_jenis_lab.update({nama_jenis_lab},{where:{
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
        master_nama_jenis_lab.findAll({})
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
        master_nama_jenis_lab.findAll({where:{
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
        master_nama_jenis_lab.destroy({where:{
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