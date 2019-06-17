const path = require('path');
const server = require('../server');
const Linkedin = require('node-linkedin')(process.env.LINKEDINCLIENTID, process.env.LINKEDINSECRET, 'http://lvh.me:3000/oauth/linkedin/callback');

module.exports = function(app) {

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/messagebox.html'))
  });

//LinkedIn
const scope = ['r_liteprofile', 'r_emailaddress', 'w_member_social'];
let linkedinToken;

    app.get('/oauth/linkedin/callback', function(req, res) {
      console.log(res);
      
        Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
            if ( err )
                return console.error(err);
            console.log("getting access token: " + results.access_token);
            linkedinToken = results.access_token;
            console.log("after define linkedin" + linkedinToken);
            return res.redirect('/');
        });
    });

    app.get('/oauth/linkedin', function(req, res) {
      // This will ask for permisssions etc and redirect to callback url.
      // console.log(res);
      Linkedin.auth.authorize(res, scope);
    });
    // still working on this route below
    app.get('/linkedin/people', function(request,res){
      console.log("access token inside people get: " + linkedinToken)
      request.get('http://api.linkedin.com/v2/people/~?format=json', {
          host: 'api.linkedin.com',
          connection: 'Keep-Alive',
          auth: {
              'bearer': linkedinToken
          }
      }, function(error,apiRes,body){
        if(error) {
          console.log(error)
        };
        console.log(apiRes);
          res.send(apiRes);
      });
    });
};





