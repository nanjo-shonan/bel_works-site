module.exports = function(eleventyConfig) {
  // src/assets ディレクトリの中身を、ビルド後のサイトにそのままコピーします。
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    // ディレクトリ構造の定義
    dir: {
      input: "src",          // ソースファイルはすべて "src" に配置
      includes: "_includes",   // 部品ファイルとレイアウトファイルは "src/_includes" に配置
      data: "_data",         // データファイルは "src/_data" に配置
      output: "_site"        // ビルド後の出力先
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
