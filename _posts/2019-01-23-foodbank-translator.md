---
layout: post
title:  "Foodbank Translator Update"
date:   2019-02-21
categories: [Software]
tags: [FoodBank]
summary: Partnering with a Foodbank to help make their lives easier with an app for translating food items into other languages
---

I've been partnering with [Pike Market Senior Center & Food Bank][foodbank] for the past couple of months to see if I could build an app that would make their lives easier, after I met their volunteer coordinator at a micro-volunteering event at Microsoft. Here's the story!

# October #
Microsoft dedicates each October to Giving - to encouraging/enabling employees to donate our time and money to organizations that are important to us. [Microsoft's Corporate Social Responsibility][csr] program is one of the best out there, and I'm very appreciative of their willingness to match my donations dollar for dollar, my volunteer hours at $25 per hour, and their enthusiasm for keeping it top of mind.

One way employees are encouraged to get involved is by attending low-barrier-to-entry "microvolunteering" events. Typically a couple of people from a non-profit come onsite and set up an activity that can be performed over the lunch hour. Last October the Pike Market Food Bank came onsite and asked us to create slides in powerpoint translating commonly donated food items into Vietnamise, Simplified Chinese and Spanish - the 3 most common non-English languages spoken by their customers. They hoped to print the slides out so they could be used to explain what a donated food item was.

It can be tricky to find the right opportunity to provide value that actually uses professional skills instead of general labor, and this seemed like a perfect opportunity! So I spent the lunch hour researching Bing translate's APIs and mocking up a very basic prototype. At the end of the session I chatted with the food bank rep, Jill, about building this out into something useable by volunteers at the foodbank, and she expressed her enthusiasm for "working together to create a really useful tool".

When I got home, I got to work! It took me ~5 hours to create a set of functioning command line scripts to output the images we were asked to create, with the food item named in 4 languges + an image. It was super exciting to see that I could very quickly create something useful, and Jill's feedback was positive.

{% assign image-list = "/assets/media/2019-02-21/console.png|/assets/media/2019-02-21/chickenbroth.png|/assets/media/2019-02-21/redpepperflakes.png" | split: "|" %}
{% include image-grid.html urls=image-list caption="First console version" alt="A screenshot of a translation application"  %}

# November #

I figured it was probably important to have an application with a GUI, for this to be actually useable. Python and interfaces is....not a great combination. There were 2 paths available to me - web, or desktop app. I opted to go with a desktop app, just because that seemed like an interesting challenge. I tried out a number of different GUI libraries, and researched a ton more! I initially opted for [PyForms][pyforms], which was very quick to get up and running, but it seemed to be impossible to output a list of images. I actually emailed the creator for help in early November, and never heard back! I quickly moved onto [Kivy][kivy], which was a very steep learning curve!

I'm not sure how anybody learns how to use a UI layout tool without reading the source code! For both UnityUI and Kivy that's been the thing that's really cracked it open for me - documentation really only goes so far. For Kivy I struggled a lot with figuring out how to position and size objects correctly...I still only have a gut feel instinct for it, and can't concisely explain it! But I wound up creating a spreadsheet-style UI after sending a couple of possibilities over to Jill.

{% assign image-list = "/assets/media/2019-02-21/ui1.png|/assets/media/2019-02-21/ui2.png" | split: "|" %}
{% include image-grid.html alt="A screenshot of a UI for entering terms to translate" urls=image-list caption="UI alternatives" %}

# December #
By December it was looking pretty good, and we set a time in mid January (after the holiday madness subsided) for me to visit the foodbank and demonstrate it. In the mean time I wrote some tests using [pytest] and set up TravisCI so that they could run automatically upon pushing to the master branch.

{% assign image-list = "/assets/media/2019-02-21/test1.png|/assets/media/2019-02-21/test2.png" | split: "|" %}
{% include image-grid.html alt="A screenshot of Travis CI tests" urls=image-list caption="TravisCI running unit tests on multiple platforms" %}

# January #

Visiting the foodbank was amazing! It was super educational to see the place, and learn about what services they provide, what they struggle with, and why these translations are valuable. It was particularly interesting to stop by on a snow day and see how the weather affected their operations. 

Jill explained to me how the images are not printed out per item and placed next to it, but instead used by volunteers to reference if somebody is having trouble understanding something. They'd ideally have them pulled out beforehand, but there isn't always time so it can be quite ad-hoc. An example of a weird food that they might use the signs for help with: Lemon Turmeric Hummus. It looks weird, and being able to find images for lemon and chickpeas might help explain it better.

Some of the notes I took:
- We definitely need a document with instructions, and ideally an in-app tutorial
- It might be nice to be able to adjust the size of the text in the output image, if people are having trouble reading it
    - Right now the size is adjusted in order to fit each translation on one line - you can see in the first set of images that in a previous version I had text wrapping, however Jill recommended the former
- The past few years they've had an increased focus on customer service and on being super welcoming, hence the push for more inclusivity with translations
- Given the images are mostly for reference, it might make sense to have a 'prepopulate' button that fills in 100 of the most common food items, so that they can print those out easily.
- They serve about 100 people in an hour!
- They tend to have multiple volunteers in each section - 4 in produce, 2 in dairy, 1-2 in dry goods.

I'd built the app for Windows and copied it (in all its 250mb glory! 😮) onto Jill's machine, and had her play with it for a bit. It ran super easily, which was a relief! I did note that the app crashed without wifi and had to [fix that bug][wifi], and a couple of other issues I noted.

{% include image.html url="/assets/media/2019-02-21/atthefoodbank.jpg" caption="Visiting the foodbank" %}

# February #

I went back a couple of weeks later (last Friday) with an updated app (free of wifi crashes!) and we tested out the update process (as simple as replacing the exe file, no need to re-copy 250mb of files)! I wrote out an instructions doc (complete with screenshots) and we set up the foodbank with their own azure subscription to use for the Bing API requests.

{% include image.html url="/assets/media/2019-02-21/appScreenshot.png" caption="The app UI as it is today"%}

# What's Next? #
All the source code is up on [github][github] - let me know if you check it out! I'm excited to check back in with the Pike Market foodbank soon to see how they're using it. I don't currently record any kind of telemetry/data, so I have to rely on qualitative questions to find out about their usage.

Right now this doesn't require any kind of ongoing action, but I'd be interested to turn it into something that's useful to other foodbanks too.

[github]: https://github.com/abethcrane/food-bank-translator
[csr]: https://www.microsoft.com/en-us/corporate-responsibility
[pyforms]: https://pyforms.readthedocs.io/
[kivy]: https://kivy.org/doc/stable/
[wifi]: https://github.com/abethcrane/food-bank-translator/commit/3fe56ff173c1eb31f3bbe5601dbdc5aa7c7efbf9
[foodbank]: https://www.pmsc-fb.org/
[pytest]: https://duckduckgo.com/?q=pytest&t=ffab&ia=web