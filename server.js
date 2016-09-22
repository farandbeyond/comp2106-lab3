//server
//requires
var connect = require('connect');
var app = connect();
var url = require('url');
//url handler functions
var mathDisplay = function(req,res,next){
	//read the url
	var urlData = url.parse(req.url, true).query;
	//parse info about the url
	var x = urlData.x;
	var y = urlData.y;
	var method = urlData.method;
	//use the urlMath function to get the intended operation and string
	res.end(urlMath(method,x,y));
}
var urlMath = function(method,value1,value2){
	//try catch in case invalid input
	if(!isNaN(value1)&&!isNaN(value2)){
		switch(method){
			case 'add':
				return value1+" + "+value2+" = "+(parseInt(value1)+parseInt(value2));
			case 'subtract':
				return value1+" - "+value2+" = "+(parseInt(value1)-parseInt(value2));
			case 'divide':
				return value1+" / "+value2+" = "+(parseInt(value1)/parseInt(value2));
			case 'multiply':
				return value1+" * "+value2+" = "+(parseInt(value1)*parseInt(value2));
		}
		return "Invalid Method type '"+method+"': See default page for valid methods";
	}else{
		return "Invalid numeric value: X("+value1+") and Y("+value2+") should only be numbers";
	}
}

var defPath = function(req,res,next){
	//give the user info on how to navigate
	res.write("add to the above url:\n");
	res.write("/lab3?method=<operation>&x=<number>&y=<number>\n");
	res.write("valid values of <operation> are:\n");
	res.write("'add','subtract','mulitply','divide'\n");
	res.write("valid values of <number> are:\n");
	res.end("any integer number\n");
}
//set pages based on url
app.use('/lab3', mathDisplay);
app.use(defPath); // this is when no url is specified
//display on port 3000
app.listen(3000);
//tell console our method is running
console.log('Connect running on port 3000');