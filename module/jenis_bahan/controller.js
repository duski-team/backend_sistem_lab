const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const jenis_bahan = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{laboratorium_id,jenis_lab_id,nama_jenis_bahan}=req.body

        jenis_bahan.create({id:uuid_v4(),laboratorium_id,jenis_lab_id,nama_jenis_bahan})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data:data.id})
        })
        .catch(error=>{
	    console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static update(req,res){
        const{id,laboratorium_id,jenis_lab_id,nama_jenis_bahan}=req.body

        jenis_bahan.update({laboratorium_id,jenis_lab_id,nama_jenis_bahan},{where:{
            id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data:data.id})
        })
        .catch(error=>{
	    console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static delete (req,res){
        const {id}= req.body

        jenis_bahan.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list(req,res){
        try {
            let data = await sq.query(``)
        } catch (error) {
            
        }
    }

    

}

module.exports=Controller