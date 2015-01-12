var ejs = require('ejs')

firstName = 'David Yand'
monthsSinceContact = 5

//var template = "Hi <%= firstName %>, I can't believe that we haven't seen each other in <%= monthsSinceContact %> months!
	//Give me a shout sometime."
var template = "Hi <%= firstName %>, I can't believe that we haven't seen each other in <%= monthsSinceContact %> months! Give me a shout sometime";

emailTemplate = ejs.render(template, {
	firstName: 'Scott',
	monthsSinceContact: 0
})

console.log(emailTemplate)
