/* OSコマンドインジェクション脆弱性を持つプログラム */

/* 
    本コードの解説：
    アクセスしたURLのパスを表示するHTTPサーバだが、
    URLの末尾にセミコロンをつけてOSコマンドで使用する文字列を入力すると、
    そのOSコマンドが実行されてしまう

    例：
    入力するURLを、
    http://localhost:8000/hoge;date とすると、dateコマンドが実行されてしまう
*/

'use strict';
const http = require('http');
const cp = require('child_process');
const server = http.createServer((req, res) => {
  const path = req.url;
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end(cp.execSync(`echo ${path}`));
});
const port = 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});