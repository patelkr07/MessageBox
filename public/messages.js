const linkedinclientid = process.env.LINKEDINCLIENTID;
const linkedinsecret = process.env.LINKEDINSECRET;
const linkedinUrl = "https://api.linkedin.com/v2/people/~?format=json"
console.log("this page");
$.ajax({
    url: linkedinUrl, 
    method:"GET"
  }).then(function(result){
    console.log(result);
    });

module.exports = 
