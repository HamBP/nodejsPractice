const fs = require('fs');

// 메서드로 만들려 했으나 기술적인 문제로 임시로 전역변수 형태로 넘김.
let articles = ``;
fs.readdir('./articles', (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        articles = articles + `<li><a href="./?id=${file}">${file}</a></li>`;
    });
});

module.exports = {
    pageRender: (article) => {
        return `
            <!DOCTYPE html>

            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta charset="utf-8">
                    <title>Node js Practice Page</title>

                    <style>
                        body {
                            color: #333;
                        }

                        h1 > a {
                            color: inherit;
                            text-decoration: none;
                        }
                        .wrapper {
                            display: grid;
                            grid-template-columns: 1fr 2fr;
                        }

                        .side-bar {
                            border-style: solid;
                            border-width: 1px 1px 0 0;
                            text-align: center;
                        }

                        .main {
                            padding: 10px;
                        }

                        .header {
                            text-align: center;
                        }

                        .articles {
                            list-style: none;
                        }
                    </style>
                </head>

                <body>
                    <header class="header">
                        <h1><a href="/">Node.js Practice Page</a></h1>
                    </header>

                    <div class="wrapper">
                        <aside class="side-bar">
                            <ul class="articles">
                                ${articles}
                            </ul>
                        </aside>

                        <main class="main">
                            <h2>${article.title}</h1>
                            <p>${article.content}</p>
                        </main>        
                    </div>        
                </body>
            </html>`;},
    getArticle: (_title) => {
        if(_title == undefined) { // 메인 페이지일 경우
            article = {
                title: '메인 페이지',
                content: ''
            }
            return article;
        }

        fs.readFile(`./articles/${_title}`, 'utf8', (err, data) => {
            if(err) throw err;
            article = {
                title: _title,
                content: data
            };
            console.log(article);
            return article;
        })
    },
    errorPage404: () => {
        return `
        <!DOCTYPE html>

        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta charset="utf-8">
                <title>Node js Practice Page</title>

                <style>
                    body {
                        text-align: center;
                        color: #333;
                    }

                    h1 > a {
                        color: inherit;
                        text-decoration: none;
                    }
                </style>
            </head>

            <body>
                <header class="header">
                    <h1><a href='/'>404 Not Found</a></h1>
                </header>   
            </body>
        </html>`
    }
}