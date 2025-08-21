# **DOMとは(Document Object Model)**

HTML文書をブラウザ上で扱いやすいオブジェクトツリー形式で表現し、
JavaScriptを使ってその要素や属性、スタイルなどを操作することができる。
つまり、DOMを使うことでWebページの要素を追加・削除・変更したり、
イベントの処理を行ったりすることができる。

モデル（Model）：
HTMLをツリー状のオブジェクトにした“データ構造”。document や div などがノードとして並ぶ。

API（操作手順）：
そのツリーを探す・読む・書き換えるための関数やプロパティ。
例：querySelector() / textContent / appendChild()。

目的：JavaScriptから画面の内容（HTML）を安全・一貫したやり方で操作できるようにするため。
→ 文字を書き換える、要素を追加/削除する、クリックに反応する…など。


## JSは“言語”、DOMは“ブラウザが提供する機能（API）”。

## **実行イメージ**
-1,ブラウザがHTMLを読む
-2,DOMツリーを作る（内部的なオブジェクトの木）
-3,JavaScriptがDOM APIを呼んで、表示を変えたりイベントに反応したりする

```text
HTML            →     DOMツリー（ブラウザが作る）
<body>                 document
  <h1>…</h1>            └─ <html>
  <p id="msg">…</p>         └─ <body>
</body>                         ├─ <h1>
                                └─ <p id="msg">
```