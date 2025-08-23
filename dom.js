document.querySelector('h1').textContent = 'シンプルブログ';
//フォーム要素と入力欄を取得
const form = document.getElementById('post-form');
const submitBtn = form.querySelector('input [type="submit"]');
const titleInput = document.getElementById('title');
const contentTextarea = document.getElementById('content');


//①※ページのリロードを止める！
form.addEventListener('submit', (e) => e.preventDefault());
//②送信ボタンをクリックした時に実行
submitBtn.addEventListener('click', () => {

    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    console.log('タイトル:', title);
    console.log('本文:', content);
});