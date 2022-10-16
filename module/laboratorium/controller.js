const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const laboratorium = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller {

    static register (req,res){
        const {kasubag_id,kajur_id,is_kajur,fakultas_id,kampus_id}= req.body

        laboratorium.findAll({where:{
            fakultas_id,kampus_id
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 200, message: "data sudah ada"})
            }
            else{
                laboratorium.create({id:uuid_v4(),kasubag_id,kajur_id,is_kajur,fakultas_id,kampus_id})
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
        const {id,kasubag_id,kajur_id,is_kajur,fakultas_id,kampus_id}= req.body
        
        laboratorium.update({kasubag_id,kajur_id,is_kajur,fakultas_id,kampus_id},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        laboratorium.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
      try {
        let data = await all.query(`select l.*,k.alamat_kampus ,mp.nama_pegawai as nama_kasubag,mp2.nama_pegawai as nama_kajur,f.nama_fakultas from laboratorium l 
        join master_pegawai mp on mp.id = l.kasubag_id
        join master_pegawai mp2 on mp2.id = l.kajur_id
        join fakultas f on f.id = l.fakultas_id
        join kampus k on k.id = l.kampus_id
        where l."deletedAt"  isnull`,s)
        res.status(200).json({ status: 200, message: "sukses" ,data});
      } catch (error) {
        console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error });
      }
    }

    

    static async detailsById (req,res){
        const{id}= req.params
        try {
            let data = await all.query(`select l.*,k.alamat_kampus ,mp.nama_pegawai as nama_kasubag,mp2.nama_pegawai as nama_kajur,f.nama_fakultas from laboratorium l 
            join master_pegawai mp on mp.id = l.kasubag_id
            join master_pegawai mp2 on mp2.id = l.kajur_id
            join fakultas f on f.id = l.fakultas_id
            join kampus k on k.id = l.kampus_id
            where l."deletedAt"  isnull and l.id = '${id}'`,s)
            res.status(200).json({ status: 200, message: "sukses" ,data});
          } catch (error) {
            console.log(error);
                res.status(500).json({ status: 500, message: "gagal", data: error });
          }
        
    }
}
module.exports = Controller;