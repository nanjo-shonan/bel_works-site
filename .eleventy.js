module.exports = function(eleventyConfig) {
  // CSSや画像などの静的ファイルを、ビルド後も同じ構造でコピーするための設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");

  // Eleventyに、各ディレクトリの場所を教えるための設定
  return {
    dir: {
      input: ".", // 入力（プロジェクトのルート）
      includes: "_includes", // インクルードファイル（ヘッダー、フッターなど）の場所
      data: "_data", // サイトデータ（site.jsonなど）の場所
      layouts: "_layouts", // ★★★ この行が最も重要です ★★★
      output: "_site" // 出力先
    },
    templateFormats: [
      "md",
      "njk",
      "html",
    ],
    htmlTemplateEngine: "njk",
  };
};