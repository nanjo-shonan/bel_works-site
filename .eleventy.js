// .eleventy.js
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // 日付をフォーマットするためのフィルターを追加
  // 使い方: {{ post.date | postDate }}
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'Asia/Tokyo'}).setLocale('ja').toLocaleString(DateTime.DATE_FULL);
  });

  // 'posts' というタグがついたコンテンツを新しい順に並べたコレクション（グループ）を作成
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse();
  });

  // 【修正】タグの一覧を自動で生成するコレクション
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    let tagSet = new Set();
    collectionApi.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;
        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    // 'posts' や 'all' といった、記事の分類に不要な内部タグを除外して返す
    return [...tagSet].filter(tag => tag !== "posts" && tag !== "all");
  });

  // 【新設】関連記事を抽出するためのフィルターを追加
  eleventyConfig.addFilter("relatedPosts", (collection, currentPost) => {
    // 現在の記事のタグとURLを取得
    const currentTags = currentPost.data.tags || [];
    const currentUrl = currentPost.url;
    
    // 自分自身を除き、同じタグを1つでも持つ記事をフィルタリング
    return collection.filter(item => {
      const itemTags = item.data.tags || [];
      return item.url !== currentUrl && itemTags.some(tag => currentTags.includes(tag) && tag !== "posts" && tag !== "all");
    }).slice(0, 6); // 最大6件まで表示
  });


  // 既存のファイルコピー設定
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("contents/**/*.{jpg,jpeg,png,gif,svg}");


  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
