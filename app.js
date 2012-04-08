var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    fs = require('fs'),
    spawn= require('child_process').spawn

var app = express.createServer();

// Config
app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function (req, res)
{
	res.send('Example: http://localhost:3000/resize/image.jpg/1024/768');
});

//http://localhost:3000/resize/image.jpg/1024/768
app.get('/resize/:image/:w/:h', function (req, res)
{
	var resize = req.params.w + 'x' + req.params.h;
	var file = './public/image/'+ req.params.image;
	var convert = spawn('convert', [file, '-resize', resize, '-']);
	res.writeHead(200, {'Content-Type': 'image/jpeg'});
	convert.stdout.pipe(res);
});

// Launch server
var port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log("Listening on " + port);
});