var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friends_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.ejs","utf8");

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('8r3At_EcNBsqlyc74fItdQ');

var FeedSub = require('feedsub');
 
var blogContent = new FeedSub('http://janbialostok.github.io/atom.xml', {
		emitOnStart: true
});

function csvParse(file){
var fileLines = [];
fileLines = file.split("\r");
var fileArray = [];
var headerArray = fileLines[0].split(",");
	for (var i = 1; i<(fileLines.length - 1); i++){
		var tempArray = [];
		tempArray = fileLines[i].split(",");
		fileArray[i - 1] = {};
		for (var y = 0; y<headerArray.length; y++){
			propName = headerArray[y];
			fileArray[i - 1][propName] = tempArray[y];
		}
	}
return fileArray;
}

var latestPost = [];

blogContent.read(function(err,blogPosts){
 
  blogPosts.forEach(function(post){
  
  var elapsed = Date.prototype.getTime(post.published);
  var dateNow = new Date();
  
  if ((dateNow - elapsed) <= 7){
  	latestPosts.push(post);
  }
  
 
  })

var csv_data = csvParse(csvFile)
csv_data.forEach(function(row){
	var firstName = row['firstName'];
	var months = row['monthsSinceContact'];
	var to_name = firstName + " " + row['lastName'];
	var to_email = row['emailAddress'];
	
	var template = emailTemplate;
	template = ejs.render(emailTemplate, 
                { firstName: firstName,  
                  monthsSinceContact: months,
				  latestPost: latestPost
                });
	//template = ejs.render(/firstName/gi, firstName).replace(/monthsSinceContact/gi, months);
	console.log(template);
	var subject = "New Hexo Blog Posts";
	var from_name = "Jan";
	var from_email = "janbialostok@gmail.com";
	function sendEmail(to_name, to_email, from_name, from_email, subject, template){
  		var message = {
      		"html": template,
      		"subject": subject,
      		"from_email": from_email,
      		"from_name": from_name,
      		"to": [{
              "email": to_email,
              "name": to_name
          	}],
      		"important": false,
      		"track_opens": true,    
      		"auto_html": false,
      		"preserve_recipients": true,
      		"merge": false,
      		"tags": [
          		"Fullstack_Hexomailer_Workshop"
      		]    
  	};
  	var async = false;
  	var ip_pool = "Main Pool";
  	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
      // console.log(message);
      // console.log(result);   
  	}, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
 	});
	
/*var fs = require('fs');
var ejs = require('ejs');
 
var FeedSub = require('feedsub');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('8r3At_EcNBsqlyc74fItdQ');
 
var csvFile = fs.readFileSync("friends_list.csv","utf8");
var emailTemplate = fs.readFileSync('emailTemplate.ejs', 'utf8');
 
 
var blogContent = new FeedSub('http://janbialotok.github.io/atom.xml', {
		emitOnStart: true
});
 
 
var latestPosts = [];
 
 
function csvParse(csvFile){
	var arrayOfObjects = [];
	var arr = csvFile.split("\n");
	var newObj;
 
	keys = arr.shift().split(",");
 
	arr.forEach(function(contact){
		contact = contact.split(",");
		newObj = {};
		
		for(var i =0; i < contact.length; i++){
			newObj[keys[i]] = contact[i];
		}
 
		arrayOfObjects.push(newObj);
 
	})
 
	return arrayOfObjects;
}
 
blogContent.read(function(err,blogPosts){
 
  blogPosts.forEach(function(post){
  
  var elapsed = Date.prototype.getTime(post.published);
  var dateNow = new Date();
  
  if ((dateNow - elapsed) <= 7){
  	latestPosts.push(post);
  }
  
 
  })
  
  csvData = csvParse(csvFile);
  csvData.forEach(function(row){
    firstName = row["firstName"];
    numMonthsSinceContact = row["monthsSinceContact"];
    copyTemplate = emailTemplate;
    var customizedTemplate = ejs.render(copyTemplate, 
      {firstName: firstName,
       numMonthsSinceContact: numMonthsSinceContact,
       latestPosts: latestPosts
    });
    
    console.log(customizedTemplate);
  })
});*/

