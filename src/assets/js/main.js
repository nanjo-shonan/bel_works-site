document.addEventListener('DOMContentLoaded', function () {
    const caseStudyItems = document.querySelectorAll('.case-study-item');
    const filterContainer = document.getElementById('tag-filter-container');

    if (caseStudyItems.length > 0 && filterContainer) {
        // 1. 全てのタグを収集し、重複を除外
        let allTags = new Set();
        caseStudyItems.forEach(item => {
            const tags = item.dataset.tags.split(',');
            tags.forEach(tag => allTags.add(tag.trim()));
        });

        // 2. フィルタリングボタンを動的に生成
        const createButton = (tag, isAll = false) => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.dataset.tag = isAll ? 'all' : tag;
            button.className = 'tag-filter-button px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300';
            if (isAll) {
                button.classList.add('bg-signal-blue', 'text-white');
            } else {
                button.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            }
            return button;
        };

        // 「すべて表示」ボタンを追加
        filterContainer.appendChild(createButton('すべて表示', true));

        // 各タグのボタンを追加
        allTags.forEach(tag => {
            filterContainer.appendChild(createButton(tag));
        });

        const filterButtons = document.querySelectorAll('.tag-filter-button');

        // 3. フィルタリングロジック
        const filterItems = (selectedTag) => {
            caseStudyItems.forEach(item => {
                if (selectedTag === 'all' || item.dataset.tags.includes(selectedTag)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };

        // 4. ボタンにクリックイベントを追加
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // アクティブなボタンのスタイルを更新
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-signal-blue', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
                });
                button.classList.add('bg-signal-blue', 'text-white');
                button.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');

                // フィルタリングを実行
                filterItems(button.dataset.tag);
            });
        });
    }
});
