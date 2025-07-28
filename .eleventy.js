module.exports = function(eleventyConfig) {
  // 静的アセットのパススルーコピー設定
  eleventyConfig.addPassthroughCopy("src/assets");

  // カスタムコレクション：各タグの投稿をグループ化
  eleventyConfig.addCollection("postsByTag", collectionApi => {
    let tags = {};
    // "case-studies"というタグを持つコンテンツを収集対象とします（将来的に拡張可能）
    collectionApi.getFilteredByTag("case-studies").forEach(item => {
      if ("tags" in item.data) {
        for (const tag of item.data.tags) {
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push(item);
        }
      }
    });

    // ページネーションで使いやすい形式に変換
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
