const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const pool_laboran = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static register (req,res){
        const {laboran_id,laboratorium_id}= req.body

        pool_laboran.findAll({where:{
            laboran_id,laboratorium_id
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                pool_laboran.create({id:uuid_v4(),laboran_id,laboratorium_id})
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
        const {id,laboran_id,laboratorium_id}= req.body
        
        pool_laboran.update({laboran_id,laboratorium_id},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        pool_laboran.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

}

module.exports=Controller