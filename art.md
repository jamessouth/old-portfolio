---
title: webpack to Snowpack: a Migration
published: false
description: 
tags: webpack, snowpack, webdev, hireme
cover_image: https://raw.githubusercontent.com/jamessouth/portfolio/master/cover.png
canonical_url: https://dev.to/jamessouth/webpack-to-snowpack-a-migration-5ea0
---
There I was, struggling with webpack and unable to resolve my issue, when I started thinking about alternatives and remembered something I had seen on Twitter called [Snowpack](https://www.snowpack.dev/).  I read the docs, it sounds neat, let's check it out! 😎 Snowpack is not a bundler for source code.  It takes your `package.json` dependencies and makes those available as JS modules, leaving you free to develop like nature intended (e.g., a hand-written HTML file loading CSS via a link tag and JS via a script tag).  As Snowpack promises, without bundling on each source code change, development cycles faster (at least, your changes show up right away).  When you are ready to deploy you can easily add some other tools/scripts to minify, hash, etc., and build for production just like you did with webpack, as I will also discuss in this article. The project we're gonna migrate is my [portfolio site on GitHub](https://jamessouth.github.io/portfolio/).  Let's begin! 🗻

One common part of a webpack build is of course to transpile source code with Babel, and you can still do that with Snowpack.  However, I think the first thing I'm going to do on this migration is drop it.  I have more than half a dozen Babel ecosystem packages...are they still necessary?  Not really.  ES6 is widely supported now and I'm not using any of the latest features like nullish coalescing in this project, plus Chromium-based Edge now supports several APIs that it didn't before.  Babel gets the 🪓.

So if we're dumping webpack and not using Babel anymore, we can remove...pretty much every (dev) dependency.  All the Babel, webpack loaders and plugins...everything except `eslint`.  Let's keep that.  We can also drop the `browserslist` section and prune the `scripts` (save the lint script) of `package.json`.  Finally, we can (😢) delete our webpack config.💔

Now with all the webpack cruft gone, it's time to start adding tools to create our Snowpack development environment.  We will start with Snowpack itself and a dev server package called [servor](https://www.npmjs.com/package/servor).  Let's start this project up and see what happens!  Right now, I have no non-dev dependencies, so running Snowpack does.....nothing!  Not unexpected.  We will add `workbox-window` later to actually use Snowpack and return this project to its former PWA glory.
```bash
⠼ snowpack installing... 
× Nothing to install.
```
Let's set up npm script for servor:
`"dev": "servor . ./src/html/index.html 3000 --reload"`

And try it again...nothing.  Oops, there are some overlooked `HtmlWebpackPlugin` template strings in the html.  Remove those and try again....OK, now we're getting somewhere.  The page loads but with no styles, so let's start there!

![webpage with styles disabled](https://raw.githubusercontent.com/jamessouth/portfolio/master/unstyled.png)

Since we're not webpacking anymore we will need to compile our sass manually so we'll install sass...and now the styles work!  Easy!😁  Let's set up an npm script to watch our sass files for changes and compile them into a css file, which will be watched by servor and any changes will quickly appear in the browser (note: sometimes a reload was needed):

`"sass": "sass --no-source-map --watch ./src/css/main.scss ./src/css/index.css"`
(Since we're just migrating from webpack and the site has already been designed, I am disabling sass source maps.)

Now on to the JS.  We will start by , so that would be lines such as:



We will also change most of our `.js` files to `.mjs` files per the [JS module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Aside_%E2%80%94_.mjs_versus_.js) convention, the exceptions being the two CSS Paint worklet files, and add our former webpack entry point in a script tag in the html.
```html
<script type="module" src="./src/js/index.mjs"></script>
```

So the JS is loading now, we just need to:

* update our imports to add file extensions
  * `import projects from './projects';` 👉 `import projects from './projects.mjs';`
* fix paths to point to `src/` files rather than the webpack import variable name
  * `src: wdk` 👉 `src: './src/images/wdk.jpg'`
* replace asset imports with fetch statements
  * `import resumePDF from '../images/resume.pdf';` 👉 `fetch('./src/images/resume.pdf')`
* replace webpack dynamic chunk imports with regular dynamic imports
  * `import(/* webpackChunkName: "linkFactory" */ './linkFactory')` 👉 `import('./linkFactory.mjs')`
* remove any other webpack/bundler specific imports
  * `import '../css/main.scss'` 👉 (moved from JS to HTML)
* etc.

I also made some structural changes such as displaying the resume from an anchor tag instead of a button that opens a modal, and the original issue that impelled me to try Snowpack in the first place, src attributes in html img tags.  Since Edge is now chromium based we can drop the fallbacks, Edge only styles that were formerly necessary.

At this point the migration is almost complete, but we haven't actually used Snowpack yet so let's add a dependency to our `package.json` and see what Snowpack does with it.

In this particular project the only dependency is `workbox-window` for loading service workers, which can be tricky to work with in development, but the procedure is the same for whatever dependency your project requires, such as react.  

Let's install `workbox-window` and run Snowpack.  Now we get this result in our terminal: 
```bash
√ snowpack installed: workbox-window. [1.07s]
```
This will create a web_modules folder with our dependency inside, and we can now reference it in our js, like so: `import { Workbox } from '../web_modules/workbox-window.js'`. That's it!  When I deploy, I move the web_modules folder into dist with the other production files.  

So that's about it!  Snowpack is a pretty simple way to handle dependencies and build an application without all the overhead of a bundler, but you can still add one for production if you need to.  However, for those interested, I'm planning another article (and possibly a small utility to handle everything discussed therein) on how to put some finishing touches on your Snowpack project (or any non-bundled project) to get some other benefits of bundling like minification and filename hashing.  Stay tuned!

Final note:  dev needs his first job, please help😃

Image by <a href="https://pixabay.com/users/Natalia_Kollegova-5226803/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2790656">Наталья Коллегова</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2790656">Pixabay</a>

