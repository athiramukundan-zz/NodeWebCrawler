
function Crawler()
{
	this.url;
	this.init = function initialize(url){
		this.url = url;
	}
}

Crawler.prototype.crawl = function crawl(RegexToCrawlFor, onSuccess, onFailure) {
	var self = this;
	var request = require("request");
	request({
	  uri: self.url,
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var matchedTags = body.match(RegexToCrawlFor) || [];
	 		onSuccess(matchedTags);
		}
		else{
			onFailure();
		}
	  
	});	
};

module.exports = Crawler;
