const config = { 
    host: 'remotemysql.com',
    user: 'wHWycoIt0d',
    password: 'JRE6hsXEaJ',
    database: 'wHWycoIt0d',
    port: 3306,
    connectionLimit : 10, 
    multipleStatements: true,
    typeCast: function (field, next) {
        if (field.type == 'JSON') {
          return (JSON.parse(field.string())); 
        }
        return next();
      },
};

module.exports = config;