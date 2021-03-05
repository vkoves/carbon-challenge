# The Carbon Challenge

The Carbon Challenge interactive simulator. This site is powered by
[Jekyll](https://jekyllrb.com/).

## Installation

You'll need to have Ruby on Rails installed, but then just go into the directory
and run:

```
gem install bundler jekyll  # Globally install Jekyll
bundle install              # Install plugins
```

## Runing Locally

In this directory, simply run:

```
jeykll serve                # Serve the site at localhost:4000
```

## Deploying

In this directory, run:

```
jekyll build
```

Then copy the contents of the `/_site` directory - this is the actual built
site!

**Note:** Anything in the `/assets` directory uses fingerprinting and has a hash
attached to the end of it based on the file contents. This means that users will
always see the latest version via cache busting.
