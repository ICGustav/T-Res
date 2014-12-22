var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var basketballPlayers = [
    {name: 'Lebron James', team: 'the Heat'},
    {name: 'Kevin Durant', team: 'the Thunder'},
    {name: 'Kobe Jordan',  team: 'the Lakers'}
  ];
  //res.render('main', { title: 'Express', someValue: 'Some Value', body: '<p> Here is a body... </p>' });
  res.render('main',{ basketballPlayers: basketballPlayers });
});

router.get('/mail', function(req,res){
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admin@dsoft.eu',
      pass: 'pusapusa44'
    }
  });

  var options = {
    viewEngine: {
      extName: '.hbs',
      layoutsDir: '/views/email/',
      defaultLayout : 'template',
      partialsDir : '/views/partials/'
    },
    viewPath: '/views'
  };
  //reference the plugin
  var hbs = require('nodemailer-express-handlebars');
//attach the plugin to the nodemailer transporter
  transporter.use('compile', hbs(options));
//send mail with options
  var mail = {
    from: 'admin@dsoft.eu',
    to: 'gustav.hlavac@gmail.com',
    subject: 'Any Subject',
    template: 'email_body',
    context: {
      variable1 : 'value1',
      variable2 : 'value2'
    }
  };
  transporter.sendMail(mail, function(error, info){
    if(error){
      console.log(info);
      res.send(info);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(error);
    }
  });

  //var sgTransport = require('nodemailer-sendgrid-transport');
  ////using sendgrid as transport, but can use any transport.
  //var send_grid = {
  //    auth: {
  //        api_user: 'api_user',
  //        api_key: 'api_key'
  //    }
  //};
  //var mailer = nodemailer.createTransport(transporter);//sgTransport(send_grid));
  //mailer.use('compile', hbs(options));

  //transporter.sendMail(mailer, function(error, info){
  //  if(error){
  //    console.log(error);
  //    res.status(200);
  //  }else{
  //    console.log('Message sent: ' + info.response);
  //    res.send(error);
  //  }
  //});
});

module.exports = router;
