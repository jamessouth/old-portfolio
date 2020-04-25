webpack to snowpack

webpack pita compile img src with htmlwpplugin/html loader

There I was struggling with webpack recently and wasn't able to really resolve my issue (src attributes in img tags) satisfactorily (a new html loader has since been released that may help and [webpack 5:last blood](https://github.com/webpack-contrib/html-loader/issues/195) will reportedly fix) so I started thinking about alternatives and remembered something I had heard about on Twitter called Snowpack.  Snowpack is not a bundler for source code.  It takes your dependencies (as in your package.json dependencies) and makes those available as modules, leaving you to develop more or less the old fashioned way (eg a hand-written html file loading css via a link tag and js via a script tag).  As Snowpack promises, without bunding on each change, development does move faster (at least, your changes show up right away).  With an additional set of dev dependencies, you can also ultimately achieve something pretty close to the webpack production experience and I want to additionally discuss that in this article.


remove babel, new features widely supported

One common part of a webpack build is of course to transpile source code with babel.  I have more than half a dozen babel ecosystem packages...are they still necessary?  Not really.  ES6 is widely supported now and I'm not using any of the latest features like nullish coalescing, plus with Chromium-based Edge now supports several APIs that it didn't before.  


step 1 remove webpack, plugins, babel, webpack config, everyting except dev deps eslint, might use later

So if we're dumping webpack and not using babel anymore, we can remove...pretty much every dependency.  All the babel, webpack loaders and plugins, everything except eslint.  we can also drop the browserslist section and npm scripts (save the lint script) of package.json.  Finally, we can (sniff) delete our webpack config.



Now with all the webpack and related cruft gone, it's time to start adding tools to create our Snowpack development environment.  We will start with Snowpack itself and a dev server package called servor.  Let's start this project up and see what happens!  Right now, I have no non-dev dependencies, so running Snowpack does.....nothing!  Not unexpected.  We will add workbox later to actually engage Snowpack and return this project to its former PWA glory.

⠼ snowpack installing... 
× Nothing to install.


set up npm dev script for servor    "dev": "servor . ./src/html/index.html 3000 --reload",

And try it again...nothing.  Oops, there are some overlooked htmlwebpackplugin template strings in the html.  Remove those and try again....OK, we're getting somewhere.  The page loads but with no styles, so let's start there!

Since we're not webpacking anymore we will need to compile our sass manually so we'll install sass...and now the styles work!  Easy!  Let's set up an npm script to watch our sass files for changes and compile them into a css file, which change will be picked up by servor and the change quickly appears in the browser (note: sometimes a reload was needed)   "sass": "sass --no-source-map --watch ./src/css/main.scss ./src/css/index.css"
Since we're just migrating from webpack and the site has already been designed, I am disabling sass source maps.

Now on to the JS.  We will start by removing webpack/bundler specific imports that are not valid JS and won't work anymore, so that's lines like import(/* webpackChunkName: "linkLoader" */ './linkLoader'), import vuelint from '../images/vuelint.jpg', import '../css/main.scss' etc.  We will also change most of our .js files to .mjs files per the js module convention, the exception being the CSS Paint worklet files, and add our former webpack entry point in a script tag in the html.  

So the JS is more or less working now, just need to update our imports to add file extensions, fix paths to point to src files rather than the webpack import variable name, replace asset imports with fetch statements, remove webpack chunk dynamic imports, etc.

I also made some structural changes such as displaying the resume from an anchor tag instead of a button that opens a modal, and the original issue that impelled me to try Snowpack in the first place, src attributes in html img tags.  Since edge is now chromium based we can drop the fallbacks, edge only styles that were formerly necessary.

ok now site is ready with contact and article added and grid adjusted, time to add a dep

add sw with workbox cli

optimize with snowpack

snowpack only handles deps, not src code, but we can use npm for that



make a simple build script

want to consider now adding a bundler

install workbox-window dep, run snowpack

√ snowpack installed: workbox-window. [1.07s]


