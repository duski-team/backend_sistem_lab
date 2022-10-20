const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const booking = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{laboratorium_id,jenis_lab_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted}= req.body

        booking.create({id:uuid_v4(),laboratorium_id,jenis_lab_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data:data.id})
        })
        .catch(error=>{
	    console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static update(req,res){
        const{id,laboratorium_id,jenis_lab_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted}= req.body

        booking.update({laboratorium_id,jenis_lab_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted},{where:{
            id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(error=>{
	    console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }
    static delete (req,res){
        const {id}= req.body

        booking.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }


    static async list(req,res){
        const{booking_in,booking_out,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,accepted}=req.body

        try {
            
        } catch (error) {
            
        }

    }

}

module.exports=Controller