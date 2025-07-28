// .eleventy.js

const eleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  // Viteプラグインの追加
  eleventyConfig.addPlugin(eleventyVitePlugin);

  // --- ↓↓↓ このショートコードを追加 ↓↓↓ ---
  // 現在の年を返すショートコード
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  // --- ↑↑↑ このショートコードを追加 ↑↑↑ ---

  // Markdownライブラリの設定
  let md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
    slugify: eleventyConfig.getFilter("slugify"),
  });
  eleventyConfig.setLibrary("md", md);

  // Passthrough Copy: アセットファイルをビルド先へそのままコピーする設定
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  // ディレクトリ構成の設定
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
