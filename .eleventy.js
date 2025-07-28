module.exports = function(eleventyConfig) {
  // 静的アセットのパススルーコピー設定
  eleventyConfig.addPassthroughCopy("src/assets");

  // カスタムコレクション：各タグの投稿をグループ化する機能
  eleventyConfig.addCollection("postsByTag", collectionApi => {
    let tags = {};
    // 将来的に作成する"case-studies"コレクション内のアイテムを収集対象とします
    const caseStudies = collectionApi.getFilteredByTag("case-studies") || [];
    
    caseStudies.forEach(item => {
      if (item.data.tags) {
        for (const tag of item.data.tags) {
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push(item);
        }
      }
    });

    // ページネーションで使いやすい形式に変換します
    return Object.keys(tags).map(tagName => {
      return {
        tagName: tagName,
        items: tags[tagName]
      };
    });
  });

  // Eleventyのディレクトリ構成設定
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "layouts",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
