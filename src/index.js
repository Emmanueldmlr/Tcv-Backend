const app = require('./app');

const db = require("./models");

db.mongoose.connect( db.url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

  })

  .then(() => {

    console.log("Connected to the database!");

  })

  .catch(err => {

    console.log("Cannot connect to the database!", err);

    process.exit();
    
  });

const port = process.env.PORT || 4000;

app.listen(port, () => {

  console.log(`using : http://localhost:${port}`);
  
});
