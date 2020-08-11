var endpoint = "https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1" ;

function geturl()
{
	var url = document.getElementById("urlinput").value ;
	var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://") ;

	if (!protocol_ok)
	{
		var newurl = "https://" + url ;
		return newurl ;
	} 
	else
	{
		return url ;
	}	

}

/*
function getrandom()
{
	var random_string = Math.random().toString(32).substring(2,5) + 
						Math.random().toString(32).substring(2,5) ;

	return random_string() ;
						
}

*/

//ANOTHER POSSIBLE WAY TO GENERATE A RANDOM STRING IN JS

function getrandom()
{
	var text = "" ;
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" ;

	for(var i=0;i<5;i++)  //  i<5 here means that the random string will of 5 characters long
	{
		text += characters.charAt(Math.floor(Math.random() * characters.length)) ;
	
	}

	return text ;
}



function genhash()
{
	if(window.location.hash == "")
	{
		window.location.hash = getrandom() ;
	}

}


function send_request(url)
{
	this.url = url ;
	$.ajax({  
				'url' : endpoint + "/" + window.location.hash.substr(1) , 
			  	'type' : 'POST',  	
			  	'data' : JSON.stringify(this.url) ,  
			  	'dataType' : 'json' , 
			  	'contentType' : 'application/json ; charset = utf-8'
		  }) ;

}


function shorturl()
{
	var longurl = geturl() ;

	genhash() ;

	send_request(longurl) ;
}

var hashh = window.location.hash.substr(1) ;

if (window.location.hash != "")
{
	$.getJSON( endpoint + "/" + hashh , 
		       function(data) 
		       {
		       		data = data["result"] ;
		       		if(data != null)
		       		{
		       			window.location.href = data ;
		       		}
		       }) ;

}