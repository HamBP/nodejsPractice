const getArticles = require('./getArticles');

module.exports = {
    pageRender: (article) => {
        console.log(getArticles(), '받은값');
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
            </html>`;}
}