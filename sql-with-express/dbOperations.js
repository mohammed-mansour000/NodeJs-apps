var config = require("./dbConfig");
var sql = require("mssql");

async function getOrders(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("select * from orders");
        return products.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function getOneOrder(orderId){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request()
                                 .input("input_parameter",sql.Int, orderId)
                                 .query("select * from orders where Id = @input_parameter");
        return product.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function addOrder(order){
    try{
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
                                // .input("Id",sql.Int, order.Id)
                                 .input("Title",sql.NVarChar, order.Title)
                                 .input("Quantity",sql.Int, order.Quantity)
                                 .input("Message",sql.NVarChar, order.Message)
                                 .input("City",sql.NVarChar, order.City)
                                 .execute("InsertOrders");     
        return insertProduct.recordsets;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getOrders : getOrders,
    getOneOrder : getOneOrder,
    addOrder : addOrder
}