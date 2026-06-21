// .eleventy.js — tells Eleventy how to build the site
module.exports = function (eleventyConfig) {

  // Copy these straight through to the built site
  eleventyConfig.addPassthroughCopy("uploads");          // CMS-uploaded images
  eleventyConfig.addPassthroughCopy("admin");            // the Decap dashboard
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" }); // css, js, images

  // A simple date formatter for templates:  {{ post.date | readableDate }}
  eleventyConfig.addFilter("readableDate", (d) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  });

  // Limit a list:  {{ collections.posts | limit(3) }}
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // The "posts" collection, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").reverse()
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
