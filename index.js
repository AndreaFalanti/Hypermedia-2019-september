'use strict';

let {setupDataLayer} = require("./other/service/DataLayer");

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 8080;

let dirToOther = path.join(__dirname, 'other');     // points Other folder


let cookieSession = require("cookie-session");
let cookieParser = require("cookie-parser");
let serveStatic = require("serve-static");

// swaggerRouter configuration
var options = {
    swaggerUi: path.join(dirToOther, '/swagger.json'),
    controllers: path.join(dirToOther, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// override default swagger UI options
var uiOptions = {
    apiDocs: "/backend/api-docs",
    swaggerUi: "/backend/swaggerui"
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(dirToOther, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Add cookies to responses
app.use(cookieParser());
app.use(cookieSession({name: "session", keys: ["abc", "def"]}));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi(uiOptions));

    app.use(serveStatic(path.join(__dirname, "public")));

    app.use("/backend/spec.yaml", function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        fs.createReadStream(path.resolve(dirToOther, 'api/swagger.yaml')).pipe(res);
    });

    app.use("/backend/app.zip", function (req, res) {
        res.setHeader('Content-Type', 'application/zip');
        fs.createReadStream(path.resolve(__dirname, 'app.zip')).pipe(res);
    });

    // Start the server
    setupDataLayer().then(
        http.createServer(app).listen(serverPort, function () {
            console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log('Swagger-ui is available on http://localhost:%d/backend/swaggerui', serverPort);
        })
    );
});
