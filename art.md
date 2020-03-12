webpack to snowpack

webpack pita compile img src with htmlwpplugin/html loader
remove babel, new features widely supported

step 1 remove webpack, plugins, babel, webpack config, everyting except dev deps eslint, might use later

remove npm scripts, add snowpack and servor

no deps without babel, so running snowpack does nothing, will add workbox later

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




