// 가독성을 위해 읽으라는 부분 먼저 읽기를 권장함.
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
const controler = {
    none: ``,
    create: `<a class="btn" href='./create'>글 쓰기</a>`,
    all: (article) => {
        return `
            <a class="btn" href='./create'>글 쓰기</a>
            <a class="btn" href='./update?id=${article.title}'>수정</a>
            <form action="./delete_process" method="post">
                <input type="hidden" name="title" value="${article.title}">
                <button class="btn" type="submit">삭제</button>
            </form>`;}
}
// type 이라는 이름으로 지으려고 했으나 통일성을 위해 article로 지음
const pageType = (article) => {
    const _id = article.id;
    if(_id == 'main') {
        return `
            ${controler.create}
            <h2>${article.title}</h2>
            <p>${article.content}</p>
            `;
    } else if(_id == 'article') {
        return `
            ${controler.all(article)}
            <h2>${article.title}</h2>
            <p>${article.content}</p>
            `;
    } else if(_id == 'create') {
        return `
            ${controler.none}
            <form class="post" action="./create_process" method="POST">
                <input type="text" name="title" placeholder="title"><br>
                <textarea name="content" id="" cols="30" rows="10" placeholder="content"></textarea>
                <button type="submit">저장</button>
            </form>
        `;
    } else if(_id == 'update') {
        return `
            ${controler.none}
            <form class="post" action="./update_process" method="POST">
                <input type="hidden" name="oldTitle" value="${article.title}"><br>
                <input type="text" name="title" value="${article.title}"><br>
                <textarea name="content" id="" cols="30" rows="10">${article.content}</textarea>
                <button type="submit">저장</button>
            </form>
        `;
    } else {
        return '404 error';
    }
}

// 이 곳부터 읽기 시작하면 된다.
module.exports = {
    pageRender: (article) => {
        console.log("function(pageRander): ", article);
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
                            ${pageType(article)}
                        </main>        
                    </div>     
                </body>
            </html>`;},
    getArticle: (_title) => {
        console.log('function(getArticle): ', _title);
        let article = {
            id: 'main',
            title: '메인 페이지',
            content: ''
        };
        
        if(_title == undefined) { // 메인 페이지일 경우
            return article;
        }
        
        article = {
            id: 'article',
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