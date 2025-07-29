// .eleventy.js

const eleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  // Viteプラグインを再度有効化し、安定動作のためのオプションを追加
  eleventyConfig.addPlugin(eleventyVitePlugin, {
    viteOptions: {
      server: {
        // ファイルシステムの変更を監視する際に、より安定したポーリング方式を使用
        watch: {
          usePolling: true,
        },
      },
    },
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

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

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");

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
