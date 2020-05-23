const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const template = require('./htmlTemplate');
const connectPage = require('./connectPage');

const app = http.createServer((request, response) => {
    console.log('server start!');
    const pathname = url.parse(request.url, true).pathname;
    const reqQuery = url.parse(request.url, true).query;

    if(pathname == '/') { // 메인 페이지
        console.log('id: ', reqQuery.id);
        const article = template.getArticle(reqQuery.id);
        response.writeHead(200);
        response.end(template.pageRender(article));
    }
    else if(pathname == '/create') {
        console.log('id: ', reqQuery.id);
        const article = {
            id: 'create'
        };
        response.writeHead(200);
        response.end(template.pageRender(article));
    }
    else if(pathname == '/create_process') {
        let body = ``;
        request.on('data', data => {
            body = body + data;
        })
        request.on('end', () => {
            queryData = qs.parse(body);
            console.log(queryData);
            fs.writeFile(`./articles/${queryData.title}`, queryData.content, 'utf8', (err) => {
                if(err) throw err;
                response.writeHead(302, {Location: `/?id=${queryData.title}`});
                response.end();
            });
        })
    } else {
        response.writeHead(404);
        response.end(template.errorPage404());
    }
});

app.listen(8080);