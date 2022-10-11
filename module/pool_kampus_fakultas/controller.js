const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const pool_kampus_fakultas = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller {

    static register (req,res){
        const {fakultas_id,kampus_id}= req.body

        pool_kampus_fakultas.findAll({where:{
            fakultas_id,kampus_id
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                pool_kampus_fakultas.create({id:uuid_v4(),fakultas_id,kampus_id})
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
        const {id,fakultas_id,kampus_id}= req.body
        
        pool_kampus_fakultas.update({fakultas_id,kampus_id},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        pool_kampus_fakultas.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
     try {
        let data = await all.query(`select pkf.id as pool_kampus_fakultas_id,* from pool_kampus_fakultas pkf 
        join fakultas f on f.id = pkf.fakultas_id 
        join kampus k on k.id = pkf.kampus_id 
        where pkf."deletedAt" isnull `,s)
        res.status(200).json({ status: 200, message: "sukses",data})
     } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "gagal", data: error})
     }
    }

    

    static async detailsById (req,res){
        const{id}=req.params
        try {
           let data = await all.query(`select pkf.id as pool_kampus_fakultas_id,* from pool_kampus_fakultas pkf 
           join fakultas f on f.id = pkf.fakultas_id 
           join kampus k on k.id = pkf.kampus_id 
           where pkf."deletedAt" isnull and pkf.id= '${id}' `,s)
           res.status(200).json({ status: 200, message: "sukses",data})
        } catch (error) {
           console.log(error);
           res.status(500).json({ status: 500, message: "gagal", data: error})
        }
       }
}
module.exports = Controller;