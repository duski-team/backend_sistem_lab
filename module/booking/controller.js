const {sq,all} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const booking = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static register(req,res){
        const{laboratorium_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted}= req.body

        booking.create({id:uuid_v4(),laboratorium_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data:data.id})
        })
        .catch(error=>{
	    console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static update(req,res){
        const{id,laboratorium_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted}= req.body

        booking.update({laboratorium_id,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,booking_in,booking_out,accepted},{where:{
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
        const{booking_in,booking_peminjam_mahasiswa,booking_peminjam_tendik,booking_peminjam_eksternal,accepted,halaman,jumlah}=req.body

        try {
            let isi = '';
            let offset = (+halaman -1) * jumlah;

            if(booking_in){
                isi+=` and date(b.booking_in) = '${booking_in}'`
            }
            if(booking_peminjam_mahasiswa){
                isi+= ` and b.booking_peminjam_mahasiswa='${booking_peminjam_mahasiswa}'`
            }
            if(booking_peminjam_tendik){
                isi+= ` and b.booking_peminjam_tendik='${booking_peminjam_tendik}'`
            }
            if(booking_peminjam_eksternal){
                isi+= ` and b.booking_peminjam_eksternal='${booking_peminjam_eksternal}'`
            }
            if(accepted){
                isi+= ` and b.accepted=${accepted}`
            }
            

            let data = await all.query(`select b.id as booking_id,* from booking b 
            left join registrasi_mahasiswa rm on rm."NIM" = b.booking_peminjam_mahasiswa 
            left join master_pegawai mp on mp.nip = b.booking_peminjam_tendik 
            left join laboratorium l on l.id = b.laboratorium_id
            where b."deletedAt" isnull ${isi} order by b.booking_in limit ${jumlah} offset ${offset}`,s)

            let jml = await all.query(`select count(*) from booking b 
            left join registrasi_mahasiswa rm on rm."NIM" = b.booking_peminjam_mahasiswa 
            left join master_pegawai mp on mp.nip = b.booking_peminjam_tendik 
            left join laboratorium l on l.id = b.laboratorium_id
            where b."deletedAt" isnull ${isi}`)

            res.status(200).json({ status: 200, message: "sukses",data,jml:jml[0].count})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }

    }

    static async detailsById(req,res){
        const{id}= req.params
        try {
            let data = await all.query(`select b.id as booking_id,* from booking b 
            left join registrasi_mahasiswa rm on rm."NIM" = b.booking_peminjam_mahasiswa 
            left join master_pegawai mp on mp.nip = b.booking_peminjam_tendik 
            left join laboratorium l on l.id = b.laboratorium_id
            where b."deletedAt" and b.id='${id}' isnull ${isi} order by b.booking_in`,s)

            res.status(200).json({ status: 200, message: "sukses",data})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

}

module.exports=Controller