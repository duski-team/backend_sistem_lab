const {sq} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const tipe_barang = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{nama_tipe_barang}=req.body
        tipe_barang.findAll({
            nama_tipe_barang
        })
        .then(hasil1=>{
            if(hasil1.length){
                res.status(200).json({ status: 200, message: "data sudaha ada"})
            }
            else{
                tipe_barang.create({id:uuid_v4(),nama_tipe_barang})
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

}

module.exports = Controller;