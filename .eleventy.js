module.exports = function(eleventyConfig) {
  // src/assets フォルダの中身を、ビルド後もそのまま出力先フォルダにコピーします
  eleventyConfig.addPassthroughCopy("src/assets/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    }
  };
};