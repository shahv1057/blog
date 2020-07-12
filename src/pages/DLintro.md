---
title: "Deep Learning (A Top-Down Approach)"
date: "2020-06-04"
---
<h2>Introduction</h2>

Deep learning models are responsible for much of the state-of-the-art technology in the world. From cancer screenings, to self-driving cars, to even the Face ID technology on your phone, deep learning models are the present and future of impactful technology. While building deep learning models can be complex, understanding how they work is more accessible than you think. 

## How to Build a Deep Learning Model

There are two paths to building a deep learning model. One is the prototypical “bottom-up” approach built on learning the mathematical fundamentals of calculus, linear algebra, and statistics and developing these skills more and more until capable of creating an effective deep learning model (essentially how you learn in school). The second “**top-down**” approach is the one I will go into here. This approach does not start at “What is a derivative?” or “How do you multiply matrices?”. It starts at “What is a deep learning model?” and “Why is it useful?” and progresses by breaking down a built model piece-by-piece until you get all the way down to the core fundamentals. This process can provide motivation and broader insight into **why** you are learning the fundamental math by relating it directly to your known goal.

To explain this, I’m going to use one of the most popular uses of deep learning: **Image Recognition**. 

## Image Recognition

Deep Learning models recreate eyes-to-brain-to-recognition processes using aptly coined “Artificial Neural Networks”. In this comparison, the model's “eyes” are the inputs, it's “brain” is the algorithim that learns from the inputs, and the "recognition" is the output. In an inputted 40x40 pixel .png image, there are 40x40 = 1600 individual pixels. Each of these pixels is then defined by a list of 3 numbers between 0 and 255 corresponding to the pixel’s RGB color. Therefore, this image of a cat would feed the model 1600 * 3 = 5400 individual RGB-specific pixel inputs.

<img src="/Plots/pixelcat.png" width="400" height="400" />

If you feed 1000 photos of cats and 1000 photos of humans into an Artificial Neural Network, indicating which photos are cats and which are humans, the model will start to identify which pixels (and patterns of pixels) best identify the image as a cat or a human. This will include all aspects of the photo, including all of the characteristics of the cat/human, as well as the background.

As a human using your own (very much not artificial) neural networks, think about how you identify an image as something like a cat. It may feel instinctual, but it is really an incredibly fast recognition of various cat-specific features that you have learned over your time alive from seeing cats (inputting cats to your brain). Your brain has registered those sharp triangular ears, piercing large eyes, or wrapped, bushy tails. An Artificial Neural Network finds these same patterns within the numerical values represented by each pixel. If nearly all the inputted cat images show two instances of very similar blocks of pixels correlating to the shape of a sharp ear, but no inputted human images show these blocks, the computer will identify this block of pixels as a highly effective method by which to identify a photo as either a cat or human. The computational power of modern computers will allow them to identify what patterns distinguish cats and humans and which do not. One example of a feature that may not distinguish the two could be something like a house background, because both cat and human photos may show similar house backgrounds.

## Implications

Identifying the difference between a cat and a human may seem trivial, but the implications of expanding these models is undeniably incredible. Let's take the example of a car. If a car can identify roads, speed limits, traffic lights, stop signs, pedestrians, and more with a level of accuracy comparable (or even better) than a safe-driving human, all of a sudden the once mystical and unfathomable concept of an autonomous car seems much more attainable!

I am by no means an expert at building these models, but I have learned enough in the last few months to build a [National Parks Classifier](https://parks.veeraldoesdata.com) that works very similar to the cat/human classifier I described in this post, using deep learning to identify differences between Sequoia, Yosemite, and Yellowstone National Parks. Check it out the link, upload a personal photo or one from the internet, and let me know how it works!











