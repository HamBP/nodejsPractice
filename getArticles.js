const fs = require('fs');

module.exports = function () {
    fs.readdir('./articles', (err, files) => {
        if(err) throw err;
        let articles = ``;
        files.forEach(file => {
            articles = articles + `<li><a href="./${file}"></a></li>`;
        });
        console.log('리턴값', articles);
        return articles;
    });
}