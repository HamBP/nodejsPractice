const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const template = require('./htmlTemplate');

const app = http.createServer((request, response) => {
    console.log('server start!');
    const pathname = url.parse(request.url, true).pathname;
    const reqQuery = url.parse(request.url, true).query;

    if(pathname == '/') {
        console.log('id: ', reqQuery.id);
        const article = template.getArticle(reqQuery.id);
        response.writeHead(200);
        response.end(template.pageRender(article));
    }
    else {
        response.writeHead(404);
        response.end(template.errorPage404());
    }
});

app.listen(8080);