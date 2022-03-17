# Bear Classification

Throwing down the gauntlet. I need to write something about Chapter 2 of the
fast.ai course book, which took a toy deep learning project -- fine-tuning a
computer vision model to classify bears as grizzly, black, or teddy -- from
concept through a "production" deployment.

But first, what am I doing here? Why am I even writing this?

I impulse-bought a book one day, called [Deep Learning for Coders with fastai &
PyTorch](https://www.amazon.com/Deep-Learning-Coders-fastai-PyTorch/dp/1492045527),
after I came across it in [a blog post by Catherine
Olsson](https://80000hours.org/articles/ml-engineering-career-transition-guide/)
about transitioning from a career in "traditional" software engineering to one
in AI, with the goal of positively shaping the future development of the field.
I've been thinking a lot about the next phase of my career, trying to come up
with realistic ways that I can use my skills to have a positive social impact,
and this sounded interesting and promising. The post recommended trying out the
fast.ai course as a way to see what deep learning is all about in 2022. I had
dipped a toe into recurrent neural networks back in 2014 or so, not long before
we moved from San Francisco to Pittsburgh, but things have changed so much
since then that I thought it made sense to start over from scratch. And, being
honest, I never really made that much progress back then. Things were new and I
was reading academic papers and trying to chart a course through without much
help, messing around in lua (this was before PyTorch) and not getting too far.

In any case, this course recommends setting up a blog -- I haven't had one
since jeez maybe 2004, when I ran Wordpress on I hosted myself on a VPS! -- and
writing about what I've been learning. Writing is a way of synthesizing, of
thinking out loud, and while I don't expect there to be any audience for these
posts, there's always the chance that somebody out there is following in my
tentative footsteps and that this could provide some food for though or some
encouragement. Also I'm mid-career, to put it generously, have always struggled
against my generalist tendencies and lack of focus, and could some kind of
"commitment mechanism" to keep myself honest. In short, I want to do this
course properly! I want to learn something new, and if writing about it is part
of the process than that's what I'm going to do.

## The power of pretrained models

All these words and I haven't even really touched on the topic at hand -- bear
classification -- yet! The basic idea was to take a pretrained model called
`cnn_learner`, provided as part of the fast.ai library, that already knows a
lot about classifying images, and push it that last little mile into becoming a
useful classifier of bear images. This was a surprisingly easy process! One of
the big takeaways me from this chapter was that pre-trained models can get you
almost all of the way there. `cnn_learner` is a convolutional neural network
that has been pretrained on the ImageNet dataset, and when it's used in this
context the library strips away the "head", the last few layers of weights that
only pertain to ImageNet classification, but retain the vast majority of
training weights. In simple terms, the network already understands the basics
of image recognition and is ready to be customized for different, more specific
problem domains.

Given this big head start, it only took about 450 example images of bears
(sourced vi the Bing Image Search API) to train a model that could recognizejjjjj
grizzly vs black vs teddy bears with almost 100% accuracy. Naively, I would
have thought that thousands of bear images at a minimum would have been
required to get these kind of results, but training on ImageNet appears to have
given the network a lot of basic knowledge about images that it could put into
use for this problem. I think this is fascinating, and it really expands the
space of problems that I could potentially tackle -- I can't come up with
thousands of data points for that many problems, but 500 isn't that
overwhelming!

## Squeezing more out of the data with augmentation

Another "trick" (or "technique", I guess -- "trick" makes it sound like
cheating) that the authors introduce in this chapter for amplifying the
training power of a smaller dataset is data augmentation. The idea is to take
each image in the training set and to manipulate it using simple image
transformation methods (resize, crop, rotate, skew), thereby creating multiple
training data points from each source image. As the book points out:

> In fact, an entirely untrained neural network knows nothing whatsoever about
> how images behave. It doesn't ven recognize that when an object is rotated by
> one degree, it still is a picture of the same thing! So training the neural
> network with examples of images in which the objects are in slightly
> different places and are slightly different sizes helps it to understand the
> basic concept of what an object is, and how it can be represented in an
> image.

## Transfer learning

A slight detour, presented somewhat earlier in the book: anything that can be
represented as an image is a potential target for an image recognition network.
Some folks trained a very accurate malware detector by representing malware
binaries as bitmap images and feeding them into a network not unlike the one we
used for bears!

The same could be done with sound files, either by depicting them as waveforms,
or -- more interesting to me -- as spectrograms:

![Andy Shauf - Living Room - Spectral
Analysis](/images/2022-03-06-waveform.jpg "A spectrogram of 'Living Room'
by Andy Shauf (a very good song)")

The network could potentially be trained to classify songs by genre based on
their spectogram. I found a (defunct) [Kaggle
contest](https://www.kaggle.com/c/multitask-music-classification) that defines
exactly this task, so apparently I'm on the right track!

## The end-to-end approach: 👍

My favorite thing about this chapter was its focus on getting the model not
just trained, but also deployed to something like a "production" setting. For
me, at least, learning something new is much more valuable when I can get it
off my laptop and out into the world, even in some small way. This blog is
another example of the same concept at work, I guess!

## Onward

I've got so much left to learn, but just the first few chapters of this course
have gotten me excited. I've got a couple of good ideas for hobby projects to
try and part of me wants to just jump right in, but I'm guessing the course
will push me towards them in due time. For now, it's enough that I can classify
bears. More to come as I keep learning.

