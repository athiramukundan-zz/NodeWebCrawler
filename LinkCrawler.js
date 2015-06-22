//TODO:ERROR HANDLING
var depth = depthRemaining = 150;
var urlsCrawled = 0;
var result = new Array();
var urlToCrawl = "https://www.facebook.com";

var path = require('path');
var Crawler = require(path.resolve( __dirname, "./crawler.js"));

var regexForLink =/(\b(https?|www|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; 



Crawler.prototype.crawlForLinks = function crawlForLinks(){
  var self = this;
  urlsCrawled += 1;

  //Success CallBack
  var onSuccess = function(matchedItems ){
    HandleItemsReturned(matchedItems);
    if(depthRemaining != 0){
      if(((urlsCrawled - 1) == result.length) && (result.length != 0)){
        //All URLs are exhauted. Cannot crawl anymore
        console.log("Exhauted all links");
      }
      else{
        urlToCrawl = result[urlsCrawled-1];
        crawlForLinks();
      }
    }
  };

  //Error CallBack
  var onFailure = function(){
    console.log("ERROR: Could not crawl to URL-"+ urlToCrawl);
    if((urlsCrawled - 1) != result.length){
      urlToCrawl = result[urlsCrawled-1];
        crawlForLinks();
    }
  };
  
  //Required depth is met. Return to caller.
  if(result.length >= depth || ((urlsCrawled -1) == result.length) && result.length != 0)
    return;
  
  //Recursive crawl till depth satisfied.
  console.log("\n\nCrawling to URL:" + urlToCrawl + "\n")
  crawler_obj.init(urlToCrawl);
  crawler_obj.crawl(regexForLink,onSuccess,onFailure);
}


function HandleItemsReturned(itemsReturned)
{
  var itemToPrint;
  if(itemsReturned.length > depthRemaining)
    itemToPrint = itemsReturned.splice(0,depthRemaining);
  else
    itemToPrint = itemsReturned
  result = result.concat(itemToPrint);
  depthRemaining = depth - result.length;

  //Print Data
  console.log(itemToPrint);
  console.log("Total links added to the list:"+result.length);
}

//Initiate Crawling.
var crawler_obj = new Crawler();
crawler_obj.crawlForLinks();