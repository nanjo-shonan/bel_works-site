module.exports = function(eleventyConfig) {

  // assetsフォルダの中身を、ビルド後もそのままpublicフォルダにコピーする設定
  eleventyConfig.addPassthroughCopy("src/assets/");

  return {
    // 開発用ソースファイルが入っているフォルダ
    dir: {
      input: "src",
      // 完成したサイトが出力されるフォルダ
      output: "public",
      // includeやlayoutファイルが置かれているフォルダ
      // （この設定により、`layout: layouts/base.njk` のような記述が正しく解決される）
      includes: "_includes",
      layouts: "_includes/layouts"
    }
  };
};