const {sq} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const pool_kampus_prodi = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller {

    static register (req,res){
        const {prodi_id,kampus_id}= req.body

        pool_kampus_prodi.findAll({where:{
            prodi_id,kampus_id
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                pool_kampus_prodi.create({id:uuid_v4(),prodi_id,kampus_id})
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
        const {id,prodi_id,kampus_id}= req.body
        
        pool_kampus_prodi.update({prodi_id,kampus_id},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        pool_kampus_prodi.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
     try {
          let data = await sq.query(``)
     } catch (error) {
        
     }
    }

    

    static detailsById (req,res){
        const{id}= req.params

        pool_kampus_prodi.findAll({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses",data});
        }).catch(err =>{
            console.log(req.params);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }
}
module.exports = Controller;