//TODO:ERROR HANDLING
var depth = depthRemaining = 150;
var urlsCrawled = 0;
var result = new Array();
var urlToCrawl = "https://python.org";
var path = require('path');
var Crawler = require(path.resolve( __dirname, "./crawler.js"));

var regexForLink =/(\b(https?|www|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; 



Crawler.prototype.crawlForLinks = function crawlForLinks(){
  var self = this;
  urlsCrawled += 1; 
  var onSuccess = function(matchedItems ){
    HandleItemsReturned(matchedItems);
    if(depthRemaining != 0){
      if(urlsCrawled === result.length){
      	onComplete();
        console.log("Exhauted all links");
      }
      else{
      	urlToCrawl = result[urlsCrawled-1];
      	crawlForLinks();
      }
    }
  };
  var onFailure = function(){
    console.log("ERROR: Could not crawl to URL-"+ urlToCrawl);
    if((urlsCrawled - 1) != result.length){
    	urlToCrawl = result[urlsCrawled-1];
      	crawlForLinks();
    }
  };
  
  if(result.length >= depth || ((urlsCrawled -1) == result.length) && result.length != 0)
    return;
  console.log("\n\nCrawling to URL:" + urlToCrawl + "\n")
  crawler_obj.init(urlToCrawl);
  crawler_obj.crawl(regexForLink,onSuccess,onFailure);
}


function HandleItemsReturned(itemsReturned){
	//console.log("depthRemaining"+depthRemaining);

  if(itemsReturned.length > depthRemaining){
  	result = result.concat(itemsReturned.splice(0,depthRemaining));
  	console.log(itemsReturned.splice(0,depthRemaining));
  }
  else{
  	result = result.concat(itemsReturned);
  	console.log(itemsReturned);
  }
  depthRemaining = depth - result.length;
  console.log("Total links added to the list:"+result.length);
}

var crawler_obj = new Crawler();
crawler_obj.crawlForLinks();