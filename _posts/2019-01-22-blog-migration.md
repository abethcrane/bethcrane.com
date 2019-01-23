---
layout: post
title:  "Migrating this blog"
date:   2019-01-22
categories: [Software]
tags: [Projects]
summary: Migrating my blog to a new domain was pretty easy, until I had to update jekyll
---
I spent the long weekend migrating this blog over from one domain to another. It's been 4 years since I first set it up, so needless to say both me and the software it's running on were a little rusty.

This following instructions until a command throws an error, poring over stackoverflow posts or github issues to try to find salvation, rinsing, repeating - it's not my favorite part of software engineering. I have a lot of respect for build engineers.

So this post is for future!Beth, the next time she's dealing with updating software on her Dreamhost servers (that she doesn't have root access on).

# Things involved in migrating a jekyll site #
- Copy all the files over (easy + obvious, a winning combo)
- Update the 'web directory' to append "/_site" so that it loads the site and not the code (easy, but non-obvious)
- Update my webhooks script to not just ```git pull```, but also run ```jekyll build``` (easy + obvious)

And this is where it gets complicated. Theoretically that's all I had to do!

But.

I noticed that on my macbook my category pages were displaying perfectly, and on my new website they weren't listing any posts. I realized my check for ```if post.categories contains page.category``` was failing because the post.categories were downcased on the webserver, but not locally. Weird.

Once I'd discovered that I checked my jekyll versions on a hunch, and it turns out locally I was running 3.8.5, and my webserver was running 2.5.3. Pretty big difference! When I set the site up I was probably running 2.5.3 locally too, but I've since replaced my macbook and dutifully reinstalled more recent versions of most software.

So, following this hunch, I decided to throw caution to the wind and try to update jekyll on my webserver. This is where it gets interesting!

# Things involved in updating Jekyll on Dreamhost #
- Update RVM (the ruby version manager) so that it could get a more recent version of Ruby (surprisingly hard)
```python
command curl -sSL https://rvm.io/mpapis.asc | gpg --import -
command curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -
curl -L get.rvm.io | bash -s stable
```
- Update Ruby so that I could update to jekyll 3+ (surprisingly hard)
Followed advice from a [blog post from 2013][sorrell] and did the following
``` python
rvm autolibs rvm_pkg
rvm install ruby-2.3.3 # or version of choice - this was arbitrary for me
rvm --default use 2.3.3 # otherwise it'll default to your previous version next time you open a shell 
```
- Update Jekyll (surprisingly hard!)
```python
gem uninstall jekyll --version 2.5.3
rm Gemfile.lock # because otherwise it kept requiring 2.5.3 in the dir, even after I uninstalled it
bundle install
```

Having finally managed to update my jekyll version, I ran ```jekyll build``` and was immediately rewarded with working category pages. So there's that. You could have worse results for 2-3 hours of headbashing I suppose.

[sorrell]: http://sorrell.github.io/2013/10/11/Dreamhost-With-Jekyll-%28and-moodle%29.html