const {sq} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const { Op } = require("sequelize");
const prodi = require("./model");
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};

class Controller {

    static register (req,res){
        const {kode_prodi,nama_prodi}= req.body
        
        prodi.findAll({where:{[Op.or]:[{kode_prodi},{nama_prodi}]}}).then(data =>{
            if(data.length){
                res.status(200).json({ status: 204, message: "data sudah ada" });
            }else{
                prodi.create({id:uuid_v4(),kode_prodi,nama_prodi}).then(data2 =>{
                    res.status(200).json({ status: 200, message: "sukses" });
                })
            }
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static update (req,res){
        const {id,kode_prodi,nama_prodi}= req.body
        
        prodi.update({kode_prodi,nama_prodi},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        prodi.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
        const {jumlah,halaman,nama_prodi,kode_prodi} = req.body
       try {
        let isi = ''
        let offset = (+halaman -1) * jumlah;
        let offset2 = +halaman * jumlah;
        let sisa = true;

        if(nama_prodi){
            isi +=` and p.nama_prodi ilike '%${nama_prodi}%'`
        }
        if(kode_prodi){
            isi +=` and p.kode_prodi ilike '%${kode_prodi}%'`
        }

        let data =  await sq.query(`select * from prodi p where p."deletedAt" isnull${isi} order by p."createdAt" desc limit ${jumlah} offset ${offset}`,s)
        let data2 =  await sq.query(`select * from prodi p where p."deletedAt" isnull${isi} order by p."createdAt" desc limit ${jumlah} offset ${offset2}`,s)
        let jml =  await sq.query(`select count(*) as "total" from prodi p where p."deletedAt" isnull${isi}`,s)
        if(data2.length==0){
            sisa = false
        }

        res.status(200).json({status:200,message:"sukses",data,count:jml[0].total,sisa,jumlah,halaman});
       } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "gagal", data: err });
       }
    }

    static listHalaman (req,res){

        prodi.findAll({order:[['createdAt','DESC']]}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses",data});
        }).catch(err =>{
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static detailsById (req,res){
        const{id}= req.params

        prodi.findAll({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses",data});
        }).catch(err =>{
            console.log(req.params);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }
}
module.exports = Controller;