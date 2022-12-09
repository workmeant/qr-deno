// main.ts
import express from "npm:express@4.18";
import QRCode from "npm:qrcode@1.5.1";
import { Buffer } from "https://deno.land/std@0.167.0/node/buffer.ts";


const app = express();


const text_qr = `|03455570009220300120718000000134519100000`

app.get('/qrcode', function(req, res, next) {

    res.writeHead(200, { 'Content-Type': 'image/png' });

    QRCode.toDataURL(req.query.text, function(err, dataurl) {
      let regex = /^data:.+\/(.+);base64,(.*)$/;
      let matches = dataurl.match(regex);
      let ext = matches[1];
      let data = matches[2];
      // let buf = fs.readFileSync("./public/images/brand.png");
      let buf = new Buffer(data, 'base64');
      res.end(buf); // Send the file data to the browser.      
    })

});


app.get('/', function(req, res, next) {

    res.writeHead(200, { 'Content-Type': 'image/png' });

    QRCode.toDataURL(text_qr, {width: 400,height: 400}, function(err, dataurl) {
      let regex = /^data:.+\/(.+);base64,(.*)$/;
      let matches = dataurl.match(regex);
      let ext = matches[1];
      let data = matches[2];
      // let buf = fs.readFileSync("./public/images/brand.png");
      let buf = new Buffer(data, 'base64');
      res.end(buf); // Send the file data to the browser.      
    })

  });

app.listen(3100);
console.log("listening on http://localhost:3100/");