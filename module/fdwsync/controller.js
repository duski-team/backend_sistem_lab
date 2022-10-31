const {all,sq} = require('../../config/connection')
const { QueryTypes } = require('sequelize'); 
const s = {type:QueryTypes.SELECT};


class Controller{

    static async fdwSyncTable(req,res){
        let datafdw = await all.query(`select * from information_schema.foreign_tables where foreign_server_name ='sistem_lab1'`,s)
        let datalokal= await sq.query(`SELECT tablename FROM pg_catalog.pg_tables where schemaname = 'public'`,s)
    
        console.log(datafdw);
        for(let i=0;i<datalokal.length;i++){
            // console.log(datalokal[i].tablename);
            let ada = false
            for(let j=0;j<datafdw.length;j++){
                if(datalokal[i].tablename==datafdw[j].foreign_table_name){
                    ada=true
                }
            }
            if(ada==false){
                await all.query(`IMPORT FOREIGN SCHEMA public limit to(${datalokal[i].tablename}) FROM SERVER sistem_lab1 INTO public;`)
                // console.log(datalokal[i].tablename);
            }
        }
        res.status(200).json({ status: 200, message: "sukses"})
    }


    // static async synckolom(req,res){
    //     let datafdw = await all.query(`select * from information_schema.foreign_tables where foreign_server_name ='sistem_lab1'`,s)
    //     let datalokal= await sq.query(`SELECT tablename FROM pg_catalog.pg_tables where schemaname = 'public'`,s)

    //     for(let i=0;i<datalokal.length;i++){
    //         let datalokal= await sq.query(`SELECT tablename FROM pg_catalog.pg_tables where schemaname = 'public'`,s)

    //         let kolomfdw= await all.query(`SELECT * FROM information_schema.columns WHERE
    //         table_schema = 'public'
    //         AND table_name = 'absensi'`)
    //     }
    // }

}

module.exports=Controller