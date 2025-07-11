// .eleventy.js

module.exports = function(eleventyConfig) {

  // 1. パススルーコピーの設定
  // EleventyはデフォルトでHTMLやMarkdownなどしか処理しないため、
  // CSSや画像、フォントなどの静的ファイルを、出力先ディレクトリ（_site）に
  // そのままコピーするための設定です。
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin"); // Netlify CMS用の設定（将来的な拡張のため）

  // 2. コレクションの定義
  // 特定のフォルダにあるコンテンツをグループ化し、一覧ページなどで利用しやすくします。

  // ポートフォリオ用のコレクションを作成
  eleventyConfig.addCollection("portfolio", function(collectionApi) {
    // "portfolio"フォルダ内の全てのファイルを取得し、日付の新しい順に並べ替えます。
    return collectionApi.getFilteredByGlob("portfolio/*.md").reverse();
  });

  // コンテンツ（ブログ記事など）用のコレクションを作成
  eleventyConfig.addCollection("contents", function(collectionApi) {
    // "contents"フォルダ内の全てのファイルを取得し、日付の新しい順に並べ替えます。
    return collectionApi.getFilteredByGlob("contents/*.md").reverse();
  });
  
  // 3. サイトの入力元と出力先ディレクトリを指定
  // これにより、プロジェクトのルートディレクトリをスッキリさせることができます。
  return {
    dir: {
      input: ".",       // 入力元（プロジェクトのルート）
      includes: "_includes", // 共通部品（ヘッダー、フッターなど）の場所
      data: "_data",       // 共通データ（site.jsonなど）の場所
      output: "_site"      // 出力先（ビルドされたサイトがここに生成される）
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"], // Eleventyが処理するファイルの拡張子
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
