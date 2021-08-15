const config = {
    user: "sa",
    password: "anyPasswordForMSSQL",
    server: "localhost",
    database: "products",
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename: "DESKTOP-FI4HSGV\MANSURSQL"
    },
    port: 1433
};

module.exports = config;