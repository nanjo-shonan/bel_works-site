// .eleventy.js

module.exports = function(eleventyConfig) {

  // パススルーコピーの設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  // コレクションの定義
  eleventyConfig.addCollection("portfolio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("portfolio/*.md").reverse();
  });
  eleventyConfig.addCollection("contents", function(collectionApi) {
    return collectionApi.getFilteredByGlob("contents/*.md").reverse();
  });
  
  // サイトの入力元と出力先ディレクトリを指定
  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts", // <<<【重要】この行を追加しました
      data: "_data",
      output: "_site"
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
