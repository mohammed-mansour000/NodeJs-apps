const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI,
     { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err) => {
       if(err)
            console.log(err)
       else{
            console.log("connected");
            console.log(process.env.MONGODB_URI)

       }
    }
  );