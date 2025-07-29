module.exports = function(eleventyConfig) {
  // src/assets フォルダの中身を、ビルド後もそのまま出力先フォルダにコピーする設定
  eleventyConfig.addPassthroughCopy("src/assets/");

  return {
    // 開発用ソースファイルが入っているフォルダ
    dir: {
      input: "src",
      // 完成したサイトが出力されるフォルダ (Netlifyのログに合わせて "_site" にします)
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    }
  };
};
