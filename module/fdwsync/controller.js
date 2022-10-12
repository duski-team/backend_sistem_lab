const {all,sq} = require('../../config/connection')
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static async fdwSyncTable(req,res){
        let datafdw = await all.query(`select * from information_schema.foreign_tables where foreign_server_name ='sistem_lab1'`,s)
        let datalokal= await sq.query(`SELECT tablename FROM pg_catalog.pg_tables where schemaname = 'public'`,s)
    
        console.log(datalokal);
        res.status(200).json({ status: 200, message: "sukses"})
    }

}

module.exports=Controller