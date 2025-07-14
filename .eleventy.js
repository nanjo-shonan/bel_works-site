const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // CSSや画像などの静的ファイルを、ビルド後も同じ構造でコピーするための設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");

  // =================================================
  // ★★★ ここからが追記部分です ★★★
  // 日付をフォーマットするためのカスタムフィルターを追加
  // 使い方: {{ myDate | postDate }}
  // =================================================
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });


  // Eleventyに、各ディレクトリの場所を教えるための設定
  return {
    dir: {
      input: ".", // 入力（プロジェクトのルート）
      includes: "_includes", // インクルードファイル（ヘッダー、フッターなど）の場所
      data: "_data", // サイトデータ（site.jsonなど）の場所
      layouts: "_layouts", // レイアウトファイルの場所
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