const fs = require('fs');

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

                        a {
                            color: inherit;
                            text-decoration: none;
                        }
                        
                        form {
                            display: inline;
                        }

                        .btn {
                            background-color: white;
                            color: inherit;
                            font-size: 16px;
                            padding: 5px;
                            border: solid 1px;
                            border-radius: 5px;  
                            box-shadow: #666 2px 2px;  
                        }

                        .btn:hover {
                            color: white;
                            background-color: #666;
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

                        .post {
                            display: block;
                            padding: 10px;
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
                            ${getPage(article)}
                        </main>        
                    </div>     
                </body>
            </html>`;},
    getArticle: (_title) => {
        if(_title == undefined) {   // 메인 페이지인 경우
            article = {
                id: 'main',
                title: '메인 페이지',
                content: ''
            };
        }
        else {                      // 글 페이지인 경우
            article = {
                id: 'article',
                title: _title,
                content: fs.readFileSync(`./articles/${_title}`, 'utf8')
            }
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

const getArticles = () => {
    const files = fs.readdirSync(`./articles`);
    let articles = ``;
    files.forEach(file => {
        articles = articles + `<li><a href="./?title=${file}">${file}</a></li>`;
    })
    return articles;
}

const getPage = (article) => {
    const _id = article.id;
    switch(_id) {
        case 'main':
            return `
                ${controler.create}
                <h2>${article.title}</h2>
                <p>${article.content}</p>`;
        case 'article': 
            return `
                ${controler.all(article)}
                <h2>${article.title}</h2>
                <p>${article.content}</p>`;
        case 'create':
            return `
                ${controler.none}
                <form class="post" action="./create_process" method="POST">
                    <input type="text" name="title" placeholder="title"><br>
                    <textarea name="content" cols="30" rows="10" placeholder="content"></textarea>
                    <button type="submit">저장</button>
                </form>`;
        case 'update':
            return `
                ${controler.none}
                <form class="post" action="./update_process" method="POST">
                    <input type="hidden" name="oldTitle" value="${article.title}"><br>
                    <input type="text" name="title" value="${article.title}"><br>
                    <textarea name="content" cols="30" rows="10">${article.content}</textarea>
                    <button type="submit">저장</button>
                </form>`;
        default:
            return '404 error';
    }
}

const controler = {
    none: ``,
    create: `<a class="btn" href='./create'>글 쓰기</a>`,
    all: (article) => {
        return `
            <a class="btn" href='./create'>글 쓰기</a>
            <a class="btn" href='./update?title=${article.title}'>수정</a>
            <form action="./delete_process" method="post">
                <input type="hidden" name="title" value="${article.title}">
                <button class="btn" type="submit">삭제</button>
            </form>`;}
}