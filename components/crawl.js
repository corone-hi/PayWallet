const Crawler = require("crawler");


const getShopname = async(storename) => {

    let result;
    let newsList;
    
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                //console.log($("title").text());
    
                const $bodyList = $("div.biz_name_area, div.Stgs-");
                newsList = [];
                $bodyList.each(function(i, elem) {
                    newsList[i] = $(this).find('span.category, span._1tj6W, span._3lc1U').text();
                  });
    
                console.log(newsList[0]);
                result = newsList[0];

                console.log("1:",result);
                
                return result;
            }
            
            done();
        }
        
    });

    //console.log(newsList);
    
    // 암호화하여 URL 생성
    c.queue('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + encodeURI(`${storename}`));

    //console.log("2:",result);
    
    
}
 

module.exports = { getShopname };