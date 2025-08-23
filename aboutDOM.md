# **DOMとは(Document Object Model)**

HTML文書をブラウザ上で扱いやすいオブジェクトツリー形式で表現し、
JavaScriptを使ってその要素や属性、スタイルなどを操作することができる。
つまり、DOMを使うことでWebページの要素を追加・削除・変更したり、
イベントの処理を行ったりすることができる。

## **モデル（Model）：**
HTMLをツリー状のオブジェクトにした“データ構造”。document や div などがノードとして並ぶ。
```text
HTML            →     DOMツリー（ブラウザが作る）
<body>                 document
  <h1>…</h1>            └─ <html>
  <p id="msg">…</p>         └─ <body>
</body>                         ├─ <h1>
                                └─ <p id="msg">
```
## **API（操作手順）：**
そのツリーを探す・読む・書き換えるための関数やプロパティ。
例：querySelector() / textContent / appendChild()。

目的：JavaScriptから画面の内容（HTML）を安全・一貫したやり方で操作できるようにするため。  
→ 文字を書き換える、要素を追加/削除する、クリックに反応する…など。

## **要点**
JSは“言語”、DOMは“ブラウザが提供する機能（API）”。

## **実行イメージ**
-1,ブラウザがHTMLを読む。  
-2,DOMツリーを作る。（内部的なオブジェクトの木）  
-3,JavaScriptがDOM APIを呼んで、表示を変えたりイベントに反応したりする。  


# **以下、サンプルを使用し、動作説明**
## **前提条件**
- DOMというディレクトリー内に以下のテキストを作成済み。
    - index.html
    - dom.js
- `<body>`タグの最下部に `<script src="dom.js"></script>` を挿入済み。

## **サンプルindex.html**
```text
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ブログ</title>
</head>
<body>
  <h1>ブログ</h1>
  <form id="post-form">
    <label for="title">タイトル：</label><br>
    <input type="text" id="title" name="title"><br>
    <label for="content">本文：</label><br>
    <textarea id="content" name="content"></textarea><br>
    <input type="submit" value="Submit">
  </form>
  <div id="posts"></div>
  <script src="dom.js"></script>
</body>
</html>
```

## **サンプルindex.htmlから作成したDOMツリーイメージ＊＊
```text
Document
└─ html [lang="ja"]
   ├─ head
   │  ├─ meta [charset="UTF-8"]
   │  ├─ meta [name="viewport", content="width=device-width, initial-scale=1"]
   │  └─ title
   │     └─ #text "ブログ"
   └─ body
      ├─ h1
      │  └─ #text "ブログ"
      ├─ form [id="post-form"]
      │  ├─ label [for="title"]
      │  │  └─ #text "タイトル："
      │  ├─ br
      │  ├─ input [type="text", id="title", name="title"]
      │  ├─ br
      │  ├─ label [for="content"]
      │  │  └─ #text "本文："
      │  ├─ br
      │  ├─ textarea [id="content", name="content"]
      │  ├─ br
      │  └─ input [type="submit", value="Submit"]
      ├─ div [id="posts"]
      └─ script [src="dom.js"]
```

## **JavaScriptを使用しh1タグのテキストを「シンプルブログ」に変更する**
拡張子.jsで作成したテキスト(dom.js)に以下を記入する。
```text
document.querySelector('h1).textContent = 'シンプルブログ';
```
### **手順**
- ブラウザはHTMLを読み込むとDOMを作成する。
- JavaScriptでDOMの中から`<h1>`タグを見つけ、テキストを変更する。

### **解説**
`document.querySelector('h1)`
    - DOMの中かから`<h1>`要素をとってくる。  
`.textContent = 'シンプルブログ'`
    - その要素の表示テキストを'シンプルブログ'に変更する。

初学者様ミニカンペ🔰
```text
取得：
- getElementById()
- querySelector()
- querySelectorAll()（CSSセレクタで要素を探す）
**`querySelector`系は"get"がつかない**
中身の変更：
- textContent
- innerHTML（まずは安全な textContent を使う）

入力値：
- input.value

クラス操作：
- element.classList.add/remove/toggle

属性操作：
- setAttribute/getAttribute

イベント：
- addEventListener('click', fn)
```

# **イベントハンドラの設定**
JavaScript を使って、フォームの送信ボタンをクリックしたときに、  
フォームに入力された内容（タイトルと本文）をコンソールに出力するようにする。
### **正解コード**
```text
//①※ページのリロードを止める！
form.addEventListener('submit', (e) => e.preventDefault());  

//②送信ボタンをクリックした時に実行
submitBtn.addEventListener('click', () => {

    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    console.log('タイトル:', title);
    console.log('本文:', content);
});
```

### **解説＊＊
-①フォーム送信のデフォルト動作を止める。  
（手順では後から追加してもいい項目。山浦さんのYouTube「JavaScript」参照）
`form.addEventListener('submit', (e) => e.preventDefault());`  
    **何をしてる？**
    フォームで「送信（submit）」が起きたときのイベントを監視して、  
    `e.preventDefault()` でブラウザ標準の動き（ページ遷移・リロード）を止める。  

-②送信ボタンをクリックした時に実行するよう指示
- `addEventListener('click', ...)`  
    送信ボタンをクリックしたときだけこの中の処理を実行する、という予約。  
- `titleInput.value / contentTextarea.value`  
    入力欄の中身の文字を取り出す。  
- `.trim()`  
    文字列の前後の空白や改行をカットする（うっかり入ったスペースを無視できる）。  
- `console.log(...)`  
    開発者ツールのコンソールに値を表示する。動作確認用のメモ出力。  

### **前提条件**
このコードの前に、次の変数が用意されている想定です：
- `form `… `<form id="post-form">` を取ってきたもの
- `submitBtn` … フォーム内の `<input type="submit">`
- `titleInput` … `<input id="title">`
- `contentTextarea` … `<textarea id="content">`

**これらの前提条件の"規則性"を理解するために必要な知識。**  
**<HTMLの形 ⇒（対応）⇒ JSの取り方・変数名が常に一定のパターンで結びつく>**  

- **①まず「鍵」を用意する（HTML側）**
    - 1つしかない要素 → id を付ける  
    （例：id="post-form", id="title", id="content"）
    - 複数ある/増える可能性がある要素 → class を付ける。  
    （例：class="post"）  
    - 種別や状態で探したい → 属性も使える。  
    例：type="submit", data-role="..."）  

- **②鍵に合う「取り方」を選ぶ（JS側）**  
    - id で1個だけ：  
        `document.getElementById('post-form')`  
    - CSSセレクタで1個目：  
        `document.querySelector('#title')`  
        （idは #title / クラスは .class名 / タグは p）  
    - ネストして範囲を絞る：親要素を起点にして、その“内側だけ”を探すこと。  
        全ページ（= document 全体）から探すのではなく、  
        特定の箱（親）を先に見つけて、その箱の中で検索する。  
        ex))`form.querySelector('input[type="submit"]')`  
        今回の「送信ボタン」は id が無いので、フォームの中を限定して  
        `form.querySelector('input[type="submit"]')` と取るのが基本。  
        **`document`は今表示しているそのページ全体を表すオブジェクト。**  
    - CSSセレクタで全部（複数）：  
        document.querySelectorAll('.post') → 繰り返しで使う  

- **③変数名のルールを決めて統一する**  
    - 迷わないコツは一貫した命名。  
    ex))  
    要素には El / Elem を付ける：  
    const formEl = document.getElementById('post-form');  
    const titleEl = document.getElementById('title');  
    const contentEl = document.getElementById('content');  
    const submitBtnEl = formEl.querySelector('input[type="submit"]');  

    - 「役割 + 種類」で名付ける：  
    `titleInput`,`contentTextarea`,`submitBtn`

    - 複数は ...Els や ...List：  
    ex))`const postEls = document.querySelectorAll('.post');`  

**~どの流派でもOK。常に同じ規則で付けるのがいちばん大事。~**

- **④いつも同じ並びで書く（テンプレ化）**  
**「変数まとめ → イベントまとめ → 関数」**
ex))  
```text
// ① 要素参照（まとめて上に）
const formEl = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const contentTextarea = document.getElementById('content');
const submitBtn = formEl.querySelector('input[type="submit"]');

// ② イベント（ここに集約）
formEl.addEventListener('submit', (e) => e.preventDefault());
submitBtn.addEventListener('click', handleClick);

// ③ 関数（動詞で命名）
function handleClick() {
  const title = titleInput.value.trim();
  const content = contentTextarea.value.trim();
  console.log('タイトル:', title);
  console.log('本文:', content);
}
```
