---
title: "Using AI to build simple AI agents"
description: "Building things fast, breaking stuff and is this Skynet yet?"
pubDate: "2025-03-19"
--- 

# AI Agents
I'm still wrapping my head around what exactly constitutes an AI "agent."
I can't tell if I'm making it more or less complicated than it actually is.
In my mind it's hooking up an LLM to the world at large.
That's it.

This might be a pretty simplistic view of agents, I don't know enough about them yet to judge but it's my starting point.
Since I'm a Linux nerd the first thing I wanted to do was give an LLM access to the command line.
Since I'm a Linux nerd I also didn't want that LLM to be one that ran somewhere I couldn't see.
This brings us to the next section.

# Can Llamas talk to Fish?
The short answer is yes.
It still amazes me how fast it is to build a proof of concept right now.
I took a morning to talk Cursor into building me a way to let a local running version of Llama 3 (this was 2 days ago so 3 is already out of date and we've moved on to 4).
There were some difficulties.

## What this thing is
I wanted to have a way to let a local running version of [Llama3 using a dockerized Ollama](https://ollama.ai) run commands on my shell and analyze the output.
I'm currently on a Garuda distro since this is also my gaming machine, which is another post I'll make at some point.
The point of that statement is that this distro uses fish as the main shell.
I'm not that familiar with Fish but I'm growing to love it.
But, I want to be able to ask AI questions about how to do things in fish and then run those commands without copy/pasting.
If something causes my internet to go out on this machine (I have fucked up a *lot* of network configs on Linux) I want to be able to continue to have access to an LLM to fix it.
I also want to make sure this thing isn't just ripping `sudo rm -rf /*`s on my machine.
So, confirmations before running commands is a requirement.
Let's move on to what went right.

## The Good
It took five minutes to get a working prototype.
I asked Cursor to build an agent that could talk to a local running Ollama in a docker container.
Five minutes later I was getting errors about bad syntax that the LLM was outputting.
Which is something.
I can't imagine how many docs I would have had to look at to get that running on my own.
I also am far from a Python expert, so there would have been a lot of Stack Overflow too.
Instead 5 minutes with Cursor gave me something that almost worked.
Which means it's time to talk about things that did not go so good.

## The Bad
Cursor gets stuck in loops.
If it gets a task wrong the first time chances are it will keep getting it wrong.
The best bet is to start a new chat, get rid of the context and try again.
Sometimes it works, sometimes you have to try a different approach.
Over the course of building this simple agent I found a great strategy: get Cursor to write some tests.
This seems to do the same thing that it does for humans, verify expectations.
Cursor couldn't see that when Ollama output multiple commands, the agent was only reading the first one.
That is until I had it write some tests.
Cursor wrote the tests.
Saw they were failing.
Then fixed them.
It took a while but with tests Cursor got there.

Cursor also has trouble with remembering direct requests.
If I tell it, hey, quit modifying this other file.
It will keep trying to modify that other file.
Right now, as I write this, it keeps changing the title and description from:
```
title: "Using AI to build simple AI agents"
description: "Building things fast, breaking stuff and is this Skynet yet?"
```
to
```
title: "The Rise of AI Agents: Transforming Software Development"
description: "Exploring how AI agents are revolutionizing software development and what it means for developers"
```
no matter how many times I tell it not to.
It's obnoxious but it's still worth using.
You just have to keep Cursor on task.

# What's next?
A good question.
Since I'm currently job hunting an app to keep track of that is probably the best answer.
I also want to mess with HuggingFace and building more interesting agents.
I'm trying to come to terms with how redundant this makes me feel.
So there's also that existential crisis to tackle.

Till next time: make up your own catch phrase, it'll probably be better than mine.