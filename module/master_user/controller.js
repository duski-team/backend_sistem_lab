const {sq,sia} = require("../../config/connection");
const { v4: uuid_v4 } = require("uuid");
const masterUser = require("./model");
const { QueryTypes } = require('sequelize');
const s = {type:QueryTypes.SELECT};


function createSuperUser (req,res){
    masterUser.findOrCreate({
        where: {
            identity_lab: "2"
        },
        defaults: {
            id: 'adminlab',
            identity_lab:'2',
            email: 'adminlab@lab.com',
            level: 99,
        }
    })
}
createSuperUser();
class Controller {

    static register (req,res){
        const {identity_lab,email,level,prodi_id}= req.body
        
        masterUser.findAll({where:{identity_lab,email,level,prodi_id}}).then(data =>{
            if(data.length){
                res.status(200).json({ status: 204, message: "data sudah ada" });
            }else{
                masterUser.create({id:uuid_v4(),identity_lab,email,level,prodi_id}).then(data2 =>{
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
        const {id,identity_lab,email,level,prodi_id}= req.body
        
        masterUser.update({identity_lab,email,level,prodi_id},{where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static delete (req,res){
        const {id}= req.body

        masterUser.destroy({where:{id}}).then(data =>{
            res.status(200).json({ status: 200, message: "sukses" });
        }).catch(err =>{
            console.log(req.body);
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        })
    }

    static async list (req,res){
        const {halaman,jumlah,prodi_id} = req.body;
        try {
            let isi = ''
            let offset = (+halaman -1) * jumlah;
            let offset2 = +halaman * jumlah;
            let sisa = true;

            if(prodi_id){
                isi += ` and mu.prodi_id = '${prodi_id}'`
            }

            let data =  await sq.query(`select mu.*,p.nama_prodi,p.kode_prodi from master_user mu left join prodi p on p.id = mu.prodi_id  where mu."deletedAt" isnull${isi} order by mu."createdAt" desc limit ${jumlah} offset ${offset}`,s);
            let data2 =  await sq.query(`select mu.*,p.nama_prodi,p.kode_prodi from master_user mu left join prodi p on p.id = mu.prodi_id  where mu."deletedAt" isnull${isi} order by mu."createdAt" desc limit ${jumlah} offset ${offset2}`,s);
            let jml =  await sq.query(`select count(*) as "total" from master_user mu left join prodi p on p.id = mu.prodi_id  where mu."deletedAt" isnull${isi}`,s);
            if(data2.length==0){
                sisa = false
            }
    
            res.status(200).json({status:200,message:"sukses",data,count:jml[0].total,sisa,jumlah,halaman});
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }

    static async listHalaman (req,res){
        try {
            let data =  await sq.query(`select mu.*,p.nama_prodi,p.kode_prodi from master_user mu left join prodi p on p.id = mu.prodi_id  where mu."deletedAt" isnull order by mu."createdAt" desc`,s);
            
            res.status(200).json({ status: 200, message: "sukses",data });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }

    static async detailsById (req,res){
        const{id}= req.params

        try {
            let data =  await sq.query(`select mu.*,p.nama_prodi,p.kode_prodi from master_user mu left join prodi p on p.id = mu.prodi_id  where mu."deletedAt" isnull and mu.id = '${id}'`,s);
            
            res.status(200).json({ status: 200, message: "sukses",data });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }

    static async listMasterUserByProdiId (req,res){
        const{prodi_id}= req.body;

        try {
            let data =  await sq.query(`select mu.*,p.nama_prodi,p.kode_prodi from master_user mu join prodi p on p.id = mu.prodi_id  where mu."deletedAt" isnull and mu.prodi_id = '${prodi_id}'`,s);
            
            res.status(200).json({ status: 200, message: "sukses",data });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }

    static async cekUser (req,res){
        try {

            let userSibiling = {
                id:  req.dataUser.idSibiling,
                identity_lab: req.dataUser.identity_lab,
                email: req.dataUser.email,
                level: req.dataUser.level,
               prodi_id: req.dataUser.prodi_id
            }
            
            res.status(200).json({status:200,message:"sukses",data:[userSibiling]})
        } catch (err) {
            console.log("error cek user");
            res.status(500).json({ status: 500, message: "gagal", data: err });
        }
    }
}
module.exports = Controller;