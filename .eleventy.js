// .eleventy.js
const eleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyVitePlugin);

  // Passthrough Copy for assets
  // This ensures your assets are copied to the output directory
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      // This key tells Eleventy that layout files are located
      // inside the `_includes` directory, in a folder named `layouts`.
      // Final path: `src/_includes/layouts/`
      layouts: "layouts", 
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
