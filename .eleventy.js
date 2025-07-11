// .eleventy.js
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // パススルーコピーの設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  // 【修正点1】日付をフォーマットするためのフィルターを追加
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy.MM.dd");
  });

  // コレクションの定義
  // 【修正点2】*.md ではなく、**/*.html を探すように修正
  eleventyConfig.addCollection("portfolio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("portfolio/**/*.html").reverse();
  });
  eleventyConfig.addCollection("contents", function(collectionApi) {
    return collectionApi.getFilteredByGlob("contents/**/*.html").reverse();
  });
  
  // サイトの入力元と出力先ディレクトリを指定
  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site"
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
