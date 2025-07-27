document.addEventListener('DOMContentLoaded', function () {
    const caseStudyGrid = document.getElementById('case-study-grid');
    const filterDropdown = document.getElementById('tag-filter-dropdown');

    if (caseStudyGrid && filterDropdown) {
        const caseStudyItems = caseStudyGrid.querySelectorAll('.case-study-item');
        const filterButton = document.getElementById('tag-filter-button');
        const filterButtonLabel = document.getElementById('current-filter-label');
        const filterOptionsWrapper = document.getElementById('tag-filter-options');
        const filterOptionsContainer = filterOptionsWrapper.querySelector('.py-1');

        // 1. 全てのタグを収集し、重複を除外
        let allTags = new Set();
        caseStudyItems.forEach(item => {
            const tags = item.dataset.tags.split(',');
            tags.forEach(tag => allTags.add(tag.trim()));
        });

        // 2. ドロップダウンの選択肢を生成する関数
        const createOption = (tag, isAll = false) => {
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = tag;
            a.dataset.tag = isAll ? 'all' : tag;
            a.className = 'tag-filter-option text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 font-sans';
            a.setAttribute('role', 'menuitem');
            return a;
        };

        // 3. 選択肢をドロップダウンに追加
        filterOptionsContainer.innerHTML = ''; // Clear existing options
        filterOptionsContainer.appendChild(createOption('すべて表示', true));
        allTags.forEach(tag => {
            filterOptionsContainer.appendChild(createOption(tag));
        });

        const filterOptions = document.querySelectorAll('.tag-filter-option');

        // 4. ドロップダウンの表示・非表示を切り替え
        filterButton.addEventListener('click', (event) => {
            event.stopPropagation();
            filterOptionsWrapper.classList.toggle('hidden');
            filterButton.setAttribute('aria-expanded', filterOptionsWrapper.classList.contains('hidden') ? 'false' : 'true');
        });

        // 5. ドロップダウンの外側をクリックしたら閉じる
        document.addEventListener('click', () => {
            if (!filterOptionsWrapper.classList.contains('hidden')) {
                filterOptionsWrapper.classList.add('hidden');
                filterButton.setAttribute('aria-expanded', 'false');
            }
        });

        // 6. フィルタリングを実行する関数
        const filterItems = (selectedTag) => {
            caseStudyItems.forEach(item => {
                const itemTags = item.dataset.tags.split(',').map(t => t.trim());
                if (selectedTag === 'all' || itemTags.includes(selectedTag)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };

        // 7. 各選択肢にクリックイベントを設定
        filterOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedTag = option.dataset.tag;
                
                // ボタンのテキストを更新
                filterButtonLabel.textContent = option.textContent.trim();

                // ドロップダウンを閉じる
                filterOptionsWrapper.classList.add('hidden');
                filterButton.setAttribute('aria-expanded', 'false');

                // フィルタリングを実行
                filterItems(selectedTag);
            });
        });
    }
});
