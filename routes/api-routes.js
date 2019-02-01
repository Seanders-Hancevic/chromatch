
const db = require('../models/matchingPic');

// ROUTING
module.exports = function (app) {




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
