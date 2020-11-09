var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_51HLAFHB5y7suhLHjFTXDjPdNWqSpamoEfi2RDVChi79X2X5QvJRXjF0pS211x60YjT4CvuvgYpuEmHi0MzSIxbMa00fRmQlyzB");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// strip strip strip


router.post("/console", (req, res) => {
  console.log(req.body.data);
  res.json('ok')
});
router.post("/charge", (req, res) => {
  console.log('------------------', req.body, '-----------------')
  var token = req.body.token;
  var amount = 2300;
  fun();
  function fun() {
    const charge = stripe.charges.create({
      source: token,
      amount: amount,
      currency: 'usd',
    }, function (err, charge) {
      // asynchronously called
      console.log(err, charge);
      res.json({ data: charge, err: err })
    })
  }
})
module.exports = router;