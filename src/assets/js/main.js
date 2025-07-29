/*
  src/assets/js/main.js
  [修正のポイント]
  - ScrollMagicのコントローラーに、コンテナとして `#scroll-container` を明示的に指定。
    これにより、アニメーションの計算範囲がコンテナ内に限定され、body全体に影響しなくなる。
  - 各アニメーションのトリガーや対象要素が、#scroll-container内の要素であることを確認。
*/

document.addEventListener('DOMContentLoaded', function () {

    // ScrollMagicのコントローラーを初期化
    // containerを指定することで、スクロールイベントの監視対象を限定する
    const controller = new ScrollMagic.Controller({
        container: "#scroll-container"
    });

    // --- アニメーションの定義 ---
    // 例：セクションが画面に入ったらフェードインするアニメーション

    // document.querySelectorAll は #scroll-container の中から探すようにするとより安全
    const scrollContainer = document.querySelector('#scroll-container');
    if (scrollContainer) {
        const sections = scrollContainer.querySelectorAll('section');

        sections.forEach(function (section, index) {
            // 各セクションに対するアニメーション
            const scene = new ScrollMagic.Scene({
                triggerElement: section, // トリガーは各セクション
                triggerHook: 0.8, // 画面の80%の位置でトリガー
                reverse: false // 一度表示されたらアニメーションを戻さない
            })
            .setTween(gsap.from(section, { y: 50, autoAlpha: 0, duration: 1, ease: 'power2.out' }))
            // .addIndicators({name: "section " + index}) // デバッグ用にインジケーターを表示
            .addTo(controller);
        });
    }

    // もしスムーススクロール等のライブラリを使っている場合も、
    // 必ず操作対象(target)を `#scroll-container` に限定してください。
    // 例：
    // const scroller = new SmoothScroller({
    //     target: document.querySelector('#scroll-container'), // NG例: document.body
    //     ...
    // });

});
