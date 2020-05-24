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
    } else if(pathname == '/create_process') {
        let queryString = ``;
        request.on('data', data => {
            queryString = queryString + data;
        })
        request.on('end', () => {
            let queryData = qs.parse(QueryString);
            console.log(queryData);
            fs.writeFile(`./articles/${queryData.title}`, queryData.content, 'utf8', (err) => {
                if(err) throw err;
                response.writeHead(302, {Location: `/?id=${queryData.title}`});
                response.end();
            });
        })
    } else if(pathname == '/update') {
    } else if(pathname == '/update_process') {
    } else if(pathname == '/delete_process') {
        let queryString = ``
        request.on('data', data => {
            queryString = queryString + data;
        })
        request.on('end', () => {
            let queryData = qs.parse(queryString);
            console.log('삭제: ', queryData);
            fs.unlink(`./articles/${queryData.title}`, () => {
                response.writeHead(302, {Location: `/`});
                response.end();
            })
        })
    } else {
        response.writeHead(404);
        response.end(template.errorPage404());
    }
});

app.listen(8080);