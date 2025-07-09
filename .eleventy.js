// .eleventy.js
module.exports = function(eleventyConfig) {
  // 'posts' というタグがついたコンテンツを新しい順に並べたコレクション（グループ）を作成
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });

  // css, imagesフォルダを、完成品サイト(_site)にそのままコピーする設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  // contentsフォルダの中にある画像も、完成品のimagesフォルダにコピーする
  eleventyConfig.addPassthroughCopy("contents/**/*.{jpg,jpeg,png,gif,svg}");


  return {
    // どのフォルダを監視・処理の対象にするか
    dir: {
      input: ".",          // ルートフォルダを対象に
      includes: "_includes", // 共通部品フォルダ
      layouts: "_layouts",   // レイアウトフォルダ
      output: "_site"        // 完成品を出力するフォルダ
    },
    // Markdownだけでなく、HTMLファイルもテンプレートとして処理できるようにする
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
