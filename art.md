webpack to snowpack

webpack pita compile img src with htmlwpplugin/html loader

There I was struggling with webpack recently and wasn't able to really resolve my issue (src attributes in img tags) satisfactorily (a new html loader has since been released that may help and [webpack 5:last blood](https://github.com/webpack-contrib/html-loader/issues/195) will reportedly fix) so I started thinking about alternatives and remembered something I had heard about on Twitter called Snowpack.  Snowpack is not a bundler for source code.  It takes your dependencies (as in your package.json dependencies) and makes those available as modules, leaving you to develop more or less the old fashioned way.  As Snowpack promises, without bunding on each change, development does move faster (at least, your changes show up right away).  With a set of dev dependencies, you can easily achieve something pretty close to the webpack experience and that is what I want to discuss in this article.


remove babel, new features widely supported

One common part of a webpack build is of course to transpile source code with babel.  I have more than half a dozen babel ecosystem packages...are they still necessary?  Not really.  ES6 is widely supported now and I'm not using any of the latest features like nullish coalescing, plus with Edge based on Chromium now, it now supports several APIs that it didn't before.  


step 1 remove webpack, plugins, babel, webpack config, everyting except dev deps eslint, might use later

So if we're not gonna use babel anymore, we can remove...pretty much every dependency.  All the babel, webpack loaders and plugins, everything except eslint.  Finally, we can (sniff) delete our webpack config.

remove npm scripts, add snowpack and servor

Next, since we're dropping babel, we can get rid of the browserslist section of package.json.  We can also remove all our old webpack scripts, leaving only our lint script.  Now with all the webpack and related cruft gone, it's time to start adding things to create our Snowpack development environment.  We will start with Snowpack itself and a dev server package called servor.

no deps without babel, so running snowpack does nothing, will add workbox later

Right now, I have no non-dev dependencies, so running Snowpack does.....nothing!  

set up npm dev script for servor

see what happens...

remove htmlwebpackplugin template strings

page loads, no styles

start with styles, no more webpack so install sass

get sass working, now we have styles

set up npm script to watch sass and compile, which is picked up by servor and the change quickly appears in the browser

since we're just migrating from webpack and the site has already been designed, disable sass source maps

start removing webpack/bundler specific import that won't work in regular js modules

first time using js modules due to using bundlers

add former webpack entry point as script tag in html

reform imports

change resume button to link, get rid of aside

continue with former entry point, fixing paths and loading more and more...

fix projects and links custom elements image fetching

fix articles, remove from IO

since edge is now chromium based get rid of fallbacks, edge only styles and elements

ok now site is ready with contact and article added and grid adjusted, time to add a dep

add sw with workbox cli

optimize with snowpack

snowpack only handles deps, not src code, but we can use npm for that

⠼ snowpack installing... 
× Nothing to install.

make a simple build script

want to consider now adding a bundler

install workbox-window dep, run snowpack

√ snowpack installed: workbox-window. [3.54s]


