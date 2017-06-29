/*Render parameters in one URL using regular expressions and replace it in the html.
  A manual way to do double binding without using a client.
  The variables should have this format e.g. {name}
	An Input will provide the parameter in the url with the format url/?param1=value*/

var http = require('http'),
	  fs   = require('fs');

http.createServer(function(req,res){
  if(req.url.indexOf("favicon.ico")>0){ return ; }

   /*Start Reading the file*/

	fs.readFile("./index.html", function(err,html){

        var html_string = html.toString();
        var array_params = [];
        var params ={};

    //Search for variables in html_string eg {{nombre}}
    
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var nombre = "";

    //Separate parameters? and their values '&'
		if(req.url.indexOf("?")>0){
			var url_data = req.url.split("?");
			var array_params = url_data[1].split("&");
		}

    //Date=Value

		for(var i = array_params.length -1; i>=0; i--){
			var param = array_params[i];
			var param_data = param.split("=");
      //[data, valor]
			params[param_data[0]] = param_data[1];

		}

    //Return new HTML

  	 for(var i= variables.length -1; i>=0; i--){
				var variable = variables[i];
				html_string = html_string.replace("{"+variables[i]+"}", params[variables[i]]);
			}



			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(html_string);
			res.end();
	});

}).listen(8080)