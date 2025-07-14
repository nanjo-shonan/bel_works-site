module.exports = function(eleventyConfig) {
  // CSSや画像などの静的ファイルを、ビルド後も同じ構造でコピーするための設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  // 将来的にJavaScriptファイルを追加した場合のために、jsフォルダもコピー対象に含めておきます。
  eleventyConfig.addPassthroughCopy("js");

  // Eleventyに、各ディレクトリの場所を教えるための設定
  return {
    dir: {
      input: ".", // 入力（プロジェクトのルート）
      includes: "_includes", // インクルードファイル（ヘッダー、フッターなど）の場所
      data: "_data", // サイトデータ（site.jsonなど）の場所
      layouts: "_layouts", // ★★★ この行が最も重要です ★★★ レイアウトファイルの場所
      output: "_site" // 出力先
    },
    // Eleventyが処理するファイルの形式を指定
    templateFormats: [
      "md",
      "njk",
      "html",
    ],
    // HTMLファイルをどのテンプレートエンジンで処理するか
    htmlTemplateEngine: "njk",
  };
};