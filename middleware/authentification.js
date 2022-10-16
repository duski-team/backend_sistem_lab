const masterUser = require('../module/master_user/model');
const axios = require('axios').default;
let url = process.env.url_sso

// async function authentification (req,res,next){
//     try {

//         const kirim = {
//             method: 'post',
//             url:url,
//             headers: {'Authorization':`Bearer ${req.headers.token}`}
//         }
//         let decode = await axios(kirim);
//         let user = decode.data.user;
//         // console.log(user);

//         masterUser.findAll({where:{identity_lab:user.identity}}).then(data => {
//             if(data.length>0){
//                 user.idSibiling = data[0].id; // userId
//                 user.identity_lab = data[0].identity_lab;
//                 user.email = data[0].email;
//                 user.level = data[0].level;
//                 user.prodi_id = data[0].prodi_id;
//                 req.dataUser = user
//                 next();
//             }
//             else{
//                 res.status(201).json({ status: 201, message: "anda tidak memiliki akses" });
//             }
//         })
//     } catch (err) {
//         console.log(err);
//          res.status(201).json({ status: 401, message: "invalid token" });
//     }
// }

async function authentification (req,res,next){
    next()
}

module.exports = authentification