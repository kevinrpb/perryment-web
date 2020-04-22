const Funnel = require("broccoli-funnel");
const Merge = require("broccoli-merge-trees");
const compileSass = require("broccoli-eyeglass");

const src = "src";
const dist = "dist";
const dirs = {
  input: {
    html: "",
    js: "assets/js",
    sass: "assets/sass",
  },
  output: {
    html: "",
    js: "assets",
    sass: "assets",
  },
};

export default (options) => {
  const html = Funnel(src, {
    srcDir: dirs.input.html,
    destDir: dirs.output.html,
    include: ["*.html"],
    annotation: "HTML Files",
  });

  const js = Funnel(src, {
    srcDir: dirs.input.js,
    destDir: dirs.output.js,
    annotation: "JS Files"
  });

  const sass = new compileSass(src, {
    sassDir: dirs.input.sass,
    cssDir: dirs.output.sass,
    annotation: "SASS Sompiling"
  });

  return Merge([html, js, sass]);
};
