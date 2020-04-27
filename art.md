---
title: webpack to snowpack: a Migration
published: false
description: 
tags: webpack snowpack webdev
---


description: Using JS to draw knockout text backgrounds
tags: CSS, JavaScript, Paint, Houdini
cover_image: https://raw.githubusercontent.com/jamessouth/knockout-demo/master/images/title.png
canonical_url: https://dev.to/jamessouth/generating-knockout-text-with-the-css-paint-houdini-api-2lac



There I was struggling with webpack recently and wasn't able to really resolve my issue (src attributes in img tags) satisfactorily (a new html loader has since been released that may help and [webpack 5:last blood](https://github.com/webpack-contrib/html-loader/issues/195) will reportedly fix) so I started thinking about alternatives and remembered something I had heard about on Twitter called [Snowpack](https://www.snowpack.dev/).  Snowpack is not a bundler for source code.  It takes your dependencies (as in your `package.json` dependencies) and makes those available as JS modules, leaving you to develop more or less the old fashioned way (e.g. a hand-written html file loading CSS via a link tag and JS via a script tag).  As Snowpack promises, without bundling on each source code change, development does move faster (at least, your changes show up right away).  With an additional set of dev dependencies, you can also ultimately achieve something pretty close to the webpack production experience and I want to additionally discuss that in this article.



One common part of a webpack build is of course to transpile source code with Babel.  I have more than half a dozen Babel ecosystem packages...are they still necessary?  Not really.  ES6 is widely supported now and I'm not using any of the latest features like nullish coalescing, plus Chromium-based Edge now supports several APIs that it didn't before.  



So if we're dumping webpack and not using Babel anymore, we can remove...pretty much every dependency.  All the Babel, webpack loaders and plugins...everything except `eslint`.  we can also drop the `browserslist` section and prune the `scripts` (save the lint script) of `package.json`.  Finally, we can (😢) delete our webpack config.💔



Now with all the webpack and related cruft gone, it's time to start adding tools to create our Snowpack development environment.  We will start with Snowpack itself and a dev server package called [servor](https://www.npmjs.com/package/servor).  Let's start this project up and see what happens!  Right now, I have no non-dev dependencies, so running Snowpack does.....nothing!  Not unexpected.  We will add `workbox-window` later to actually engage Snowpack and return this project to its former PWA glory.
```bash
⠼ snowpack installing... 
× Nothing to install.
```
Let's set up npm script for servor:
`"dev": "servor . ./src/html/index.html 3000 --reload"`

And try it again...nothing.  Oops, there are some overlooked htmlwebpackplugin template strings in the html.  Remove those and try again....OK, we're getting somewhere.  The page loads but with no styles, so let's start there!

![webpage with styles disabled](https://raw.githubusercontent.com/jamessouth/knockout-demo/master/images/demo2.png)

Since we're not webpacking anymore we will need to compile our sass manually so we'll install sass...and now the styles work!  Easy!  Let's set up an npm script to watch our sass files for changes and compile them into a css file, which will be watched by servor and any changes will quickly appear in the browser (note: sometimes a reload was needed):
`"sass": "sass --no-source-map --watch ./src/css/main.scss ./src/css/index.css"`

Since we're just migrating from webpack and the site has already been designed, I am disabling sass source maps.

Now on to the JS.  We will start by removing webpack/bundler specific imports that are not valid JS and won't work anymore, so that would be lines such as:

`import(/* webpackChunkName: "linkLoader" */ './linkLoader')`
`import vuelint from '../images/vuelint.jpg'`
`import '../css/main.scss'`

We will also change most of our `.js` files to `.mjs` files per the JS module convention, the exception being the CSS Paint worklet files, and add our former webpack entry point in a script tag in the html.  

So the JS is more or less working now, just need to update our imports to add file extensions, fix paths to point to src files rather than the webpack import variable name, replace asset imports with fetch statements, remove webpack chunk dynamic imports, etc.

I also made some structural changes such as displaying the resume from an anchor tag instead of a button that opens a modal, and the original issue that impelled me to try Snowpack in the first place, src attributes in html img tags.  Since Edge is now chromium based we can drop the fallbacks, Edge only styles that were formerly necessary.

At this point the migration is almost complete, but we haven't actually used Snowpack yet so let's add a dependency to our `package.json` and see what Snowpack does with it.

In this particular project the only dependency is `workbox-window` for loading service workers, which can be tricky to work with in development, but the procedure is the same for whatever dependency your project requires, such as react.  

Let's install `workbox-window` and run Snowpack.  Now we get this result in our terminal: 
```bash
√ snowpack installed: workbox-window. [1.07s]
```
This will create a web_modules folder with our dependency inside, and we can now reference it in our js, like so: `import { Workbox } from '../web_modules/workbox-window.js'`. That's it!  When I deploy, I move the web_modules folder into dist with the other production files.  

So that's about it!  Snowpack is a pretty simple way to handle dependencies and build an application without all the overhead of a bundler, but you can still add one for production if you need to.  However, for those interested, I'm planning another article (and possibly a small utility to handle everything discussed therein) on how to put some finishing touches on your Snowpack project (or any non-bundled project) to get some other benefits of bundling like minification and filename hashing.  Stay tuned! 



