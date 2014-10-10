//------------------------------------------------------------------------------
var http    = require("http")
  , fs      = require('fs')
  , url     = require("url")
  , urls    = require("./modules/regexp")
//------------------------------------------------------------------------------
http.createServer(function(req, res) {
    switch (url.parse(req.url, true).pathname){
        case '/':
            res.writeHead(200);
            var file = fs.readFileSync('client/index.html');
            res.end(file);
            break;
        //----------------------------------------------------------------------
        case '/upload':
            switch (req.method) {
                case 'GET':
                    console.log(url.parse(req.url, true).query);
                    break;
                case 'POST':
                  var newfile = fs.createWriteStream('newfile.md');
                  req.pipe(newfile);
                  req.on('end', function(){
                     console.log('It´s uploaded !!!');
                  });
                  break;
            }
            break;
            //------------------------------------------------------------------
        case '/download':
            
            break;
        
        case '/login':
            
            break;
        
        case '/logout':
            
            break;
        
        case '/p':
            var query = url.parse(req.url, true).query
              , html = ""
              , content = "";
            //------------------------------------------------------------------
            var options = {
               hostname: query.d,
               path: query.p,
               method: req.method,
               headers: {
                  //cookie: req.headers['cookie'],
                  'accept-language': req.headers['accept-language'],
                  'user-agent': req.headers['user-agent'],
                  'x-region': req.headers['x-region'],
                  connection: req.headers['connection']
               }
            };
            //------------------------------------------------------------------
            http.get(options, function(data){
               var first_package = true;
               try{
                  html = (data.headers['content-type'].indexOf('text/html') >= 0)? true : false;
               } catch(e){
                  console.log('Error: '+e);
                  console.log(data.headers['content-type']);
               }
               
               data.on('data', function(chunk){
                  if (html)
                     content += chunk;
                  else {
                     if (first_package) {
                        content = chunk;
                        first_package = false;
                     } else
                        content += chunk;
                  }
                  
               }).on('end', function(){
                  //html && fs.writeFile('sites/Antes.html', content);
                  
                  res.writeHeader(200, {'Content-Type': data.headers['content-type']});
                  //if (html) content = replace(content);
                  if (html) {
                     content = urls.relative(content, options.hostname);
                     content = urls.absolute(content);
                  }
                  //html && fs.writeFile('sites/Después.html', content);
                  
                  res.end(content);
                  console.log('Content-Type: '+data.headers['content-type']+'\n');
               });
            });
            break;
            //------------------------------------------------------------------
    }
}).listen(process.env.PORT);