// .eleventy.js

const eleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const Nunjucks = require("nunjucks"); // Nunjucksをインポート

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  // Viteプラグインを安定化オプション付きで有効化
  eleventyConfig.addPlugin(eleventyVitePlugin, {
    viteOptions: {
      server: {
        watch: {
          usePolling: true,
        },
      },
    },
  });

  // フロントマターの解析方法を明示的に設定
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    engine: "yaml",
    delimiters: "---",
  });

  // Nunjucksのカスタム環境を設定
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/_includes")
  );
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

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

  // アセットファイルのパススルー設定
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
