document.querySelector('h1').textContent = 'シンプルブログ';
//フォーム要素と入力欄を取得
const form = document.getElementById('post-form');
const submitBtn = form.querySelector('input[type="submit"]');
const titleInput = document.getElementById('title');
const contentTextarea = document.getElementById('content');
const posts = document.getElementById('posts');

//ここに色変更を追加
form.addEventListener('pointerenter', () => { document.body.style.backgroundColor = 'yellow'; });
form.addEventListener('pointerleave', () => { document.body.style.backgroundColor = 'white'; });

//①※ページのリロードを止める！
form.addEventListener('submit', (e) => e.preventDefault());
//②送信ボタンをクリックした時に実行
submitBtn.addEventListener('click', () => {

    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    console.log('タイトル:', title);
    console.log('本文:', content);


    //#postsの中身を指定の形に置き換え
    const h2 = document.createElement('h2');
    h2.textContent = title;
    const p = document.createElement('p');
    p.textContent = content;
    posts.prepend(p);   // 先に p を入れる
    posts.prepend(h2);  // 次に h2 を入れる（結果：先頭が h2、その下に p）

    // 3投稿(= 子要素 6個)を超えたら、一番古いセット（末尾の p → h2）を削除
    while (posts.children.length > 6) {
    posts.lastElementChild.remove(); // 古いほうの p
    posts.lastElementChild.remove(); // 古いほうの h2
}

//フォームの中身を空にする
    form.reset();
    titleInput.focus();
});