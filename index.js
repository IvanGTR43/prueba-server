const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const portDB = 27017;
const { IP_SERVER, PORT_DB, API_VERSION } = require("./config");
mongoose.set("useFindAndModify", false);
//mongodb+srv://ivangtr:<password>@cluster0.bcxry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://${IP_SERVER}:${PORT_DB}/ivangtr
mongoose.connect(
  `mongodb+srv://ivangtr2:Password123@cluster0.bcxry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Conexion a bd correcta");
      app.listen(port, () => {
        console.log("Api Rest");
        console.log(
          `mongodb+srv://<username>:<password>@cluster0.bcxry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
      });
    }
  }
);
