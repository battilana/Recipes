//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Type} = require('./src/db');
const {API_KEY} = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001,  async() => {
    console.log('%s listening at 3001');// eslint-disable-line no-console
    let recApi =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    let types = []
    if(recApi){
      recApi.data.results.map((e)=>{
        e.diets.map((t) => {if (!types.includes(t)){
          types.push(t)
        } return types
      })
      return types
    })}
    console.log(types)
    // let types = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian","Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP"]
    types.map(async (e, i)=>(
      await Type.findOrCreate({
        where:{
          name:e,
          id: i
        }
      })
      .catch((error)=>console.log(error)))
    )
})})
