
const db = require('../models/matchingPic');

// ROUTING
module.exports = function (app) {

  // // GET request: Route for retrieving todo from the database.
  // app.get('/api/https://api.unsplash.com/', function (req, res) { //Works
  //   console.log('--------retrieving---------');
  //   db.matchingPicSchema.find({})
  //     .then(function (dbtodo) {
  //       console.log(dbtodo)
  //       res.json(dbtodo);
  //     })
  //     .catch(function (err) {
  //       console.log(err)
  //       res.json(err);
  //     });
  // });


  // app.get('https://api.unsplash.com/', function (req, res) {
  //   unsplash.photos.getPhoto("mtNweauBsMQ", 1920, 1080, [0, 0, 1920, 1080])
  //     .then(toJson)
  //     .then(json => {
  //       res.json(json)
  //     }).catch(function (err) {
  //       console.log(err)
  //       res.json(err);
  //     });;
  // });




  app.get('/api/matchingPic', function (req, res) {
    db.find({})
    .then(function (dbpic) {
        console.log(dbpic)
        res.json(dbpic);
    })
    .catch(function (err) {
        console.log(err)
        res.json(err);
    });
  });


  app.post('/api/matchingPic', function (req, res) { //Works
    console.log('------Adding to pic in mongo');
    db.create(req.body)
      .then(function (dbtodo) {
        console.log();
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false });
      });
  });
}
