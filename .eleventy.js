module.exports = function(eleventyConfig) {
  // 静的アセットのパススルーコピー設定
  // "src/assets"ディレクトリを、ビルド時にそのまま出力先(_site)へコピーします。
  eleventyConfig.addPassthroughCopy("src/assets");

  // Eleventyのディレクトリ構成設定
  return {
    // ソースファイルの入力元として"src"ディレクトリを指定します。
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "layouts",
      data: "_data",
      output: "_site" // ビルド後のサイトが出力されるディレクトリです。
    },
    // Eleventyが処理するテンプレートファイルの拡張子を指定します。
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};