---
layout: post
title:  "What happens in university assignments..."
date:   2015-05-25
categories: [Software]
tags: [Graphics]
summary: What happens in university assignments stayed in university assignments...up until github became a thing let's be real.
---
I definitely appreciated having Monday off work and being able to spend some time on my own projects. This is partially carrot-motivated (projects are fun! I love crossing things off my to-do list!) and heavily stick-motivated (I've been stressin' about needing to invest in my competency outside of work), but as long as it's motivated I'm happy.

![Ideal Monday]({{ "/assets/media/2015-05-25/cafe.jpg" | prepend: site.baseurl | downcase }})

The main project I'm focussing on right now is cleaning up a university assignment from 2013; [weatherworld][github] was a super marks-focussed OpenGL project that displays a map with some randomised weather. I decided to dust it off for a few reasons:

- Intentionally learning/understanding how the graphics pipeline works will be super helpful for the kinds of things I'm doing at work.
- Building on an existing project is way easier than starting from scratch - it's quicker to see results and make small changes rather than getting bogged down in scaffolding (not the goal here)
- Getting a Java project cleanly set up on my macbook seemed like a good thing to know how to do; this allows me to learn [maven][maven] and so bump up my tools knowledge as well as my code knowledge.

![Nighttime]({{ "/assets/media/2015-05-25/night.png" | prepend: site.baseurl | downcase }})

The end goal of this is to take in a location and display appropriate weather, but we're a long way off. I spent this morning playing with auto-generation of levels and getting that up to minimum viability - the actual processing of that input definitely needs some improvement, but I'm pleased with progress. I had to relearn a bunch about bezier curves; turns our my lecturer gave us sample code for roads and so I never properly understood it.

![Daytime]({{ "/assets/media/2015-05-25/day.png" | prepend: site.baseurl | downcase }})

Next focus point is probably smoothing out the ground and creating a 'base' for it, so that it's not quite so 2-dimensional.

[github]: https://github.com/abethcrane/weatherworld
[maven]: https://maven.apache.org/