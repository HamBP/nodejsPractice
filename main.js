const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const template = require('./htmlTemplate');

const app = http.createServer((request, response) => {
    console.log('server start!');

    const article = {
        title: '제목',
        content: '내용'
    };

    if(request.url = '/') {
        response.end(template.pageRender(article));
    }
});

app.listen(8080);