require('./App.js');

const db = require('../models/matchingPic');
var cors = require('cors')

// ROUTING
module.exports = function (app) {


  
  // express route
  // enable cors on express server
  app.use(cors());
  // make request to unsplash
  app.post("/unsplash", (req, res) => {
    // get query from request
    const query = req.body.query;
    const page = req.body.page
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=${page}&per_page=10&query=${query}&client_id=b814057aac4ca06658cabe4ed1f1e80bf7c2553a2f616bbbabe7a2d6e9e79f1a`
      )
      .then(response => {
        console.log(response.data);
        res.send(response.data);
      });
  });

  app.post('/api/matchingPic', function (req, res) { //Works
    console.log('------Adding to pic in mongo');
    db.create(req.body.data)
      .then(function (dbtodo) {
        console.log();
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false });
      });
  });
}
