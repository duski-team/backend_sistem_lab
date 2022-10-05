const {sq} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const kampus = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller {

    static register (req,res){
        const {wilayah_id,alamat_kampus}= req.body

        kampus.findAll({where:{
            wilayah_id,alamat_kampus
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                kampus.create({id:uuid_v4(),wilayah_id,alamat_kampus})
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

    static update (req,res){
        const {id,wilayah_id,alamat_kampus}= req.body
        
        kampus.update({wilayah_id,alamat_kampus},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        kampus.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
        kampus.findAll().then(data =>{
            res.status(200).json({ status: 200, message: "sukses",data});
        }).catch(err =>{
            console.log(req.params);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    

    static detailsById (req,res){
        const{id}= req.params

        kampus.findAll({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses",data});
        }).catch(err =>{
            console.log(req.params);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }
}
module.exports = Controller;