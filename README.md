# NodeWebCrawler
###Introduction:
NodeWebCrawler is a program written using node js that could crawl though a website to find links in that page. The crawler could then crawl through all the links to print a repository of links. The number of links it should print is specified in linkCrawler.js.

NodeWebCrawler consists of 2 main files-
#####a) crawler.js - 
Can crawl for anything in a page based on the regular expression provided in it's init method. NodeWebCrawler uses it to find links in a given page.
#####b) linkCrawler.js -
Contains logic to recursively call links from pre-found links to retrieve the required number of links.
To change the number of links to crawl for, edit depth/depthRemaing variable in the 1st line of the file. Default value is set to 150.
To change the start url, edit the urlToCrawl variable. Default is "https://www.facebook.com".

####Usage
node LinkCrawler.js
