module.exports = function(eleventyConfig) {
  // "src/assets"ディレクトリを、ビルド時にそのまま出力先(_site)へコピーします。
  eleventyConfig.addPassthroughCopy("src/assets");

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
