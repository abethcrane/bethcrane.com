---
layout: post
title:  "Texts from <strike>last night</strike> my computer"
date:   2015-05-28
categories: [Software]
tags: [Work]
summary: My computer texts me when it shuts down and starts up. Some call it clingy but I like to think of it as having my back.
---
[Windows 10][insider] is pretty bae. We have this Stockholm Syndrome thing going on, where I can't imagine how boring life must be developing on a non-experimental/in-development OS. What would I do all day? How would I bond with my coworkers if we didn't have the shared suffering of dogfooding/flighting/self-hosting? Unthinkable.

Mostly updates happen at about 3am, but sometimes Windows decides to have my back in a non-obvious way. Like at 7pm it'll be all "Whoops sorry you have to go home now. Enjoy the sunshine". Or I'll come back from lunch and have a forced break where I get to read textbooks or find out what the rest of my team are working on. Windows and I are total bros, I'd just appreciate some more communication.

So today after my computer finished updating I finally set some notifications up. 

# Powershell Script #
There are [lots of awesome guides][first guide] on [sending mail from powershell][SendMail]. I went with this method:

	$smtp = New-Object Net.Mail.SmtpClient($smtpServer)
	$smtp.Send($smtpFrom, $smtpTo, $messageSubject, $messageBody)

# Task Scheduler vs Local Policies #
[Task Scheduler][Tasks] seemed like a sensible place to start; you pick a trigger (time or event) and combine it with an action. Actions used to including send emails (!) but now only allow you to set arguments and execute a program. Running powershell and passing it the script path was easy enough and worked perfectly...for start up.

Unfortunately Task Scheduler doesn't have an on-shutdown trigger, so that threw a spanner in the works.

This helpful [Stack Overflow][SO] answer pointed me to gpedit.msc, to edit Local Policies. It has both shutdown and startup triggers, but a more limited set of actions - you can only run scripts. As it turned out, this was exactly the functionality I wanted - the scripts can be either cmd or powershell scripts, so I didn't even have to write a wrapper .cmd file.

# Email -> Text #
Most phone providers have a system for converting emails sent to $phone-number@domainname into an SMS to $phone-number. It took me about 30 seconds to find T-Mobile's (tmomail.net), and then adding the the text message cherry-on-top took 2 seconds.

 
[insider]: https://insider.windows.com/
[SO]: http://stackoverflow.com/a/18747578/4629688
[Tasks]: http://windows.microsoft.com/en-US/windows/schedule-task#1TC=windows-7
[first guide]: http://exchangeserverpro.com/powershell-how-to-send-email/
[SendMail]: http://www.adminarsenal.com/admin-arsenal-blog/powershell-sending-email-with-gmail-example