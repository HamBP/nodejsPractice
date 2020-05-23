const fs = require('fs');

// 기술적인 문제로 임시로 객체 바깥에 구현함.   TODO: 객체 내부로 옮길 것.
const getArticles = () => {
    const files = fs.readdirSync(`./articles`);
    let articles = ``;
    files.forEach(file => {
        articles = articles + `<li><a href="./?id=${file}">${file}</a></li>`;
    })
    return articles;
}

module.exports = {
    pageRender: (article) => {
        console.log("catch!", article);
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
                                ${getArticles()}
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
        let article = {
            title: '메인 페이지',
            content: ''
        };
        
        if(_title == undefined) { // 메인 페이지일 경우
            return article;
        }
        
        article = {
            title: _title,
            content: fs.readFileSync(`./articles/${_title}`, 'utf8')
        }
        return article;
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