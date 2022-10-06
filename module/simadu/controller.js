const {simadu,all}=require('../../config/connection')
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static async listWilayah(req,res){
        try {
            let data = await simadu.query(`select * from wilayah w where w."deletedAt" isnull  `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(req.body)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async detailsWilayahById(req,res){
        const{id}=req.params
        try {
            let data = await simadu.query(`select * from wilayah w where w."deletedAt" isnull and w.id = '${id}' `,s)
            res.status(200).json({ status: 200, message: "sukses", data})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }
}

module.exports=Controller