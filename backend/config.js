// module.exports = {
//   JWT_SECRET: "IAmIronMan",
//   MONGO_URI: "mongodb://localhost:27019/PayTM1",
// };
require("dotenv").config();
const { MONGO_URI } = process.env;
console.log(MONGO_URI);

/* 

rs.initiate({
    _id: "rs1",
    members: [
        { _id: 0, host: "localhost:27018" },
        { _id: 1, host: "localhost:27019" },
        { _id: 2, host: "localhost:27020" }
    ]
})

*/
