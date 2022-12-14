const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const jenis_lab = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller {

    static register (req,res){
        const {fakultas_id,master_nama_jenis_lab_id,laboratorium_id,kode_lab}= req.body

        jenis_lab.findAll({where:{
            fakultas_id,master_nama_jenis_lab_id,kode_lab
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                jenis_lab.create({id:uuid_v4(),fakultas_id,master_nama_jenis_lab_id,laboratorium_id,kode_lab})
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
        const {id,fakultas_id,master_nama_jenis_lab_id,kode_lab}= req.body
        
        jenis_lab.update({fakultas_id,master_nama_jenis_lab_id,kode_lab},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        jenis_lab.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
       try {
        let data = await all.query(`select jl.id as jenis_lab_id,* from jenis_lab jl join fakultas f on jl.fakultas_id = f.id join master_nama_jenis_lab mnjl on mnjl.id = jl."master_nama_jenis_lab_id" where jl."deletedAt" isnull `,s,)
        res.status(200).json({ status: 200, message: "sukses",data});
       } catch (error) {
        console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error });
       }
    }

    

    static async detailsById (req,res){
        const{id}= req.params
        try {
            let data = await all.query(`select jl.id as jenis_lab_id,* from jenis_lab jl join fakultas f on jl.fakultas_id = f.id join master_nama_jenis_lab mnjl on mnjl.id = jl."master_nama_jenis_lab_id" where jl."deletedAt" isnull  and jl.id='${id}'`,s,)
            res.status(200).json({ status: 200, message: "sukses",data});
           } catch (err) {
            console.log(err);
                res.status(500).json({ status: 500, message: "gagal", data: err });
           }
    }
}
module.exports = Controller;