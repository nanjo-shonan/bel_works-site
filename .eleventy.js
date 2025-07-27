module.exports = function(eleventyConfig) {
  // 静的アセットのパススルーコピー設定
  // 以下のフォルダは、サイト構築時にそのまま出力ディレクトリ(_site)にコピーされます。
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");

  // Eleventyのディレクトリ設定
  return {
    // サイトのソースコードが"src"フォルダにあることをEleventyに伝えます。
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts", // layoutsフォルダは、includesフォルダからの相対パスです。
      data: "_data",
      output: "_site" // 完成したサイトが出力されるフォルダ名です。
    },
    // Eleventyが処理するテンプレートファイルの形式を指定します。
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};