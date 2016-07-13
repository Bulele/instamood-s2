var INSTA_API_BASE_URL = "https://api.instagram.com/v1";
var app = angular.module('Instamood',[]);
var clientID="01507c2354314508b0f628bebc85f5c5";
var sentence;
var icountSent=-1;


app.controller('MainCtrl', function($scope, $http) {
	$scope.icounterLiked=0;
	var icounterCaption=0;
	var icounterTotalLikes=0;
	var icounterHashtags=0;
	var daysStoredArray=[];
	$scope.totalHashtags=0;
	$scope.avgCaptionLength=0;
	$scope.totalPics=0;
	var tempDate;
	var tempDayValue;
	var tempCaption;
		$scope.scores=[];
		$scope.picArray=[];
 
  $scope.hasToken = true;
  var token = window.location.hash;
  console.log(token);
  if (!token) {
  	$scope.hasToken = false;
  }
  token = token.split("=")[1];

  $scope.analyzeSentiments = function(sentence) {
  	$http({
  		url:"https://twinword-sentiment-analysis.p.mashape.com/analyze/?"+"text="+sentence ,
  		method: 'GET',
  		headers:{
  			"X-Mashape-Key":"92WCf5fqbDmshZxd2DcznjeoMUuzp1zxqFxjsnMnWywbuBAxQg",
  			"Accept": "application/json",}

  		}).then(function(responsetwo){

  			console.log( responsetwo.data.type);
  			$scope.scores.push(responsetwo.data.type);
  			
  			var newscore={
  				"scored":responsetwo.data.type
  			}
  			console.log($scope.picArray);
  		console.log("yo dude just work!");
  			icountSent++;
  			//console.log(icountSent);
  			console.log("sent"+ $scope.picArray[icountSent]);
  			//$scope.picArray[icountSent].push(newscore);

  			//for(var i=0; i<$scope.picArray.length; i++)
  		//	{
  				//$scope.picArray[]


  			//}
  			
  			//return  responsetwo.data.type;


})
  		 

  	};



  	$scope.getInstaStats=function(){
  		$scope.icounterLiked=0;
  		icounterCaption=0;
  		icounterTotalLikes=0;
  		$scope.perc=0;
  		var path = "/users/self/media/recent?";
  		var mediaUrl = INSTA_API_BASE_URL + path;
  		$http({
  			method: "JSONP",
  			url: mediaUrl,
  			params: {
  				callback: "JSON_CALLBACK",
  				access_token: token,	    
  			}
  		}).then(function(response) {
  			console.log(response.data.data);
  			$scope.picArrayLiked = response.data.data;
  			$scope.totalPics=$scope.picArrayLiked.length;


	 //Number of Pictures I've liked
	 for(var i=0; i<$scope.picArrayLiked.length; i++){
	 	if(response.data.data[i].user_has_liked===true){
	 		$scope.icounterLiked++;
	 	}
	 }

	 $scope.perc=($scope.icounterLiked/$scope.totalPics*100);
			///$scope.avgCaptionLength=();

	  	//Average Caption Length
	  	for(var i=0; i<$scope.picArrayLiked.length; i++){
	  		icounterCaption+= response.data.data[i].caption.text.length;
	  	}
	  	console.log("caption counter" + icounterCaption);

	  	$scope.avgCaptionLength=icounterCaption/$scope.totalPics;

	  	//Popularity
	  	for(var i=0; i<$scope.picArrayLiked.length;i++){
	  		icounterTotalLikes+= response.data.data[i].likes.count;}
	  		$scope.totalLikes=icounterTotalLikes;
	  		console.log($scope.totalLikes);

	  	//Active Days
	  	for(var i=0; i<$scope.picArrayLiked.length;i++){

	  		tempDate= new Date(parseInt(response.data.data[i].created_time)*1000);


	  		tempDayValue=(getDateString(tempDate.getDay()));
	  		daysStoredArray.push(tempDayValue);}


	  		$scope.activedays=getActiveFunction(daysStoredArray);

	  	//Visibility Thirst
	  	for(var i=0; i<$scope.picArrayLiked.length;i++){
	  		icounterHashtags+= response.data.data[i].tags.length;
	  	}

	  	$scope.totalHashtags=icounterHashtags;


	  });};




  		$scope.getDateString =function(intValue){
  			switch(intValue){

  				case 0:
  				day = "Sunday";
  				break;
  				case 1:
  				day = "Monday";
  				break;
  				case 2:
  				day = "Tuesday";
  				break;
  				case 3:
  				day = "Wednesday";
  				break;
  				case 4:
  				day = "Thursday";
  				break;
  				case 5:
  				day = "Friday";
  				break;
  				case 6:
  				day = "Saturday";
  				break;
  				default:  day= "invalid"
  			}
  			return day;
  		}; 

  		var getActiveFunction=function(stored){
  			var daysObjects=[
  			{"Day": "Sunday", "Value":0},
  			{"Day": "Monday", "Value":0},
  			{"Day": "Tuesday", "Value":0},
  			{"Day": "Wednesday", "Value":0},
  			{"Day": "Thursday", "Value":0},
  			{"Day": "Friday", "Value":0},
  			{"Day": "Saturday", "Value":0}
  			]
  			console.log(daysObjects);

  			for(var i=0; i<stored.length; i++){
  				if(stored[i]=="Sunday")
  					{daysObjects[0].Value++;}}

  				for(var i=0; i<stored.length; i++){
  					if(stored[i]=="Monday")
  						{daysObjects[1].Value++;}}
  					for(var i=0; i<stored.length; i++){
  						if(stored[i]=="Tuesday")
  							{daysObjects[2].Value++;}}
  						for(var i=0; i<stored.length; i++){
  							if(stored[i]=="Wednesday")
  								{daysObjects[3].Value++;}}
  							for(var i=0; i<stored.length; i++){
  								if(stored[i]=="Thursday")
  									{daysObjects[4].Value++;}}
  								for(var i=0; i<stored.length; i++){
  									if(stored[i]=="Friday")
  										{daysObjects[5].Value++;}}
  									for(var i=0; i<stored.length; i++){
  										if(stored[i]=="Saturday")
  											{daysObjects[6].Value++;}}
  										console.log(daysObjects);
  										var maxvalue=0;
  										var maxDay="Sunday";
  										for(var i=0; i<7; i++)
  											{ if ((daysObjects[i].Value)>maxvalue){
  												maxvalue=daysObjects[i].Value;
  												maxDay=daysObjects[i].Day;
  											}


  										}
  										return maxDay;
  									};

  									$scope.getInstaPics = function() {
  									
  										var path = "/users/self/media/recent?";
  										var mediaUrl = INSTA_API_BASE_URL + path;
  										$http({
  											method: "JSONP",
  											url: mediaUrl,
  											params: {
  												callback: "JSON_CALLBACK",
  												access_token: token,	    
  											}
  										}).then(function(response) {
  											$scope.picArray = response.data.data;
  											$scope.temppicArray=response.data;
  											console.log("yo yo yo yo" + $scope.analyzeSentiments("hello"));
  											for(var i=0; i<$scope.picArray.length; i++)
  												{caption=response.data.data[i].caption.text;
  														$scope.analyzeSentiments(caption);

												}

//console.log($scope.scores);

});
  									};

  									$scope.getDescendingLikes = function() {
  										$scope.scores=[];
  										var path = "/users/self/media/recent?";
  										var mediaUrl = INSTA_API_BASE_URL + path;
  										$http({
  											method: "JSONP",
  											url: mediaUrl,
  											params: {
  												callback: "JSON_CALLBACK",
  												access_token: token,	    

  											}
  										}).then(function(response) {

  											$scope.picArray = response.data.data;
  											$scope.picArray.sort(function(a,b) {return b.likes.count-a.likes.count});
  											console.log($scope.picArray);

});

  									};


  									$scope.getAscendingDate = function() {
  										$scope.scores=[];
  										var path = "/users/self/media/recent?";
  										var mediaUrl = INSTA_API_BASE_URL + path;
  										$http({
  											method: "JSONP",
  											url: mediaUrl,
  											params: {
  												callback: "JSON_CALLBACK",
  												access_token: token,	    

        // you need to add your access token here, as per the documentation
    }
}).then(function(response) {

$scope.picArray = response.data.data;
$scope.picArray.sort(function(a,b) {return a.created_time-b.created_time});
console.log($scope.picArray);
   
});

};


} );








