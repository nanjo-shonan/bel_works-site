module.exports = function(eleventyConfig) {
  // src/assets ディレクトリの中身を、ビルド後のサイトにそのままコピーします。
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    // ディレクトリ構造の定義
    dir: {
      input: "src",
      // includesキーのみを指定。これにより、レイアウトとパーシャルは
      // すべてこの "src/_includes" ディレクトリから探されます。
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
