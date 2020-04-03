---
title: "Has the Weeknd's music changed? An analytical look into his music over the years" 
date: "2020-02-22"
---

![debatepic](/Plots/weekndpic.jpg "Logo Title Text 1")

### Intro

The Weeknd has had an incredible amount of success over the last few years. Songs like "Earned It", "The Hills", "Can't Feel My Face", "Starboy", "I Feel It Coming", and many more songs have dominated top charts on popular streaming services like Spotify and Apple Music. His mix of Pop, Hip Hop, and R&B has clearly left a mark.

What is it about The Weeknd's music that has skyrocketed his success? The soothing smoothness of his iconic voice? Perhaps his incredible vocal range?

I used to believe that The Weeknd possessed some intangible characteristic that really couldn't be explained. However, after starting to learn about **Natural Language Processing (NLP)**, I began to question that thought. Was there an analytical method behind understanding The Weeknd's musical brilliance and streaming success? How has his music evolved over time? How does his music analytically differ from songs from other similar artists?

### Natural Language Processing

Natural Language Processing, or NLP, refers to the process of using a computer to read, understand, and extract useful analytical data from human language.

My goal is to collect, clean, and organize The Weeknd's lyrics in Python, and subsequently use **NLP** to explore the data.

### Project Overview

There are several steps that need to be taken before NLP analyses can even begin. Here's a broad overview of my key steps:

##### Preprocessing
- Import Python Packages
    - Pandas, NumPy, Matplotlib, Wordcloud, nltk, re, string, sklearn
- Import Data
    - Lyrics from The Weeknd's four released albums: Kiss Land, Trilogy, Beauty Behind the Madness, and Starboy
- Organize Data
    - Fit data into a Pandas DataFrame
- Clean Data
    
- Feature Engineer Relevant Variables

##### Text Analysis
##### Results
##### Visualizations
##### Conclusions
##### Areas for Further Research


### Import Python Packages

```
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import re
import string
import nltk
import wordcloud
import sklearn
```

### Import Data :notes:

First step is to collect my data. Using the _PyLyrics_ package, a program written with the specific purpose of retrieving lyrics, I imported all the The Weeknd's song lyrics into my Jupyter Notebook.

```
from PyLyrics import *
starboy = ["Starboy","Party Monster","False Alarm","Reminder",...,"I Feel It Coming"]
wknd = 'The_Weeknd'
for song in starboy:
    lyr.append(PyLyrics.getLyrics(wknd,song))
```

Above is a snippet of the code I ran to acquire lyrics for every song in an album. Inputting and artist and song name into the getLyrics() function outputted the song's lyrics.

### Organize Data

My next step is to concatenate all lyrics and organize the songs into a Pandas DataFrame. After collection and intital organization, the DataFrame looked like this:

![debatepic](/Plots/weeknd_df_head.png "Logo Title Text 1")
![debatepic](/Plots/weeknd_df_tail.png "Logo Title Text 1")

### Clean Data

Clean text data is essential to Natural Language Processing. chose to requires punctuation-free, lowercase text to standardize analysis. To make these changes, I built a simple data cleaning function:

```
def clean_data(series):
    series = series.str.replace('[(),.?]','')
    series = series.str.replace('-|\s+',' ')
    series = series.str.lower()
    return series
```

To paint a picture, this function perform the following transformation to this excerpt from the Weeknd's hit song, Starboy:


**INPUT:**
```
"I'm tryna put you in the worst mood, ah\nP1 cleaner than your church shoes, ah\nMilli point two just to hurt you, ah\nAll red Lamb' just to tease you, ah\n\nNone of these toys on lease too, ah\nMade your whole year in a week too, yah\nMain bitch out of your league too, ah\nSide bitch out of your league too
```

**OUTPUT**
```
"i'm tryna put you in the worst mood ah cleaner than your church shoes ah milli point two just to hurt you ah all red lamb' just to tease you ah none of these toys on lease too ah made your whole year in a week too yah main bitch out of your league too ah side bitch out of your league too
```

Much cleaner!!

### Feature Engineering

Ok, at this point I have a Pandas Dataframe with columns for Album, Song, and Lyrics, with the lyrics stripped of all punctuation and capitalization.

Next, I need to engineer some new columns from my data to have more interesting variables to analyze.

This is where some project-relevant thought comes in. What features can I engineer from my data? What new variables could be particularly interesting, or perhaps shed light on interesting trends? Are there other variables relevant to songs that could be imported in to do further research?

#### Word Counts
 - How many times does The Weeknd say "Starboy" in the song "Starboy"?
 - How often does he curse? 
 - What are his most popular words in each of his albums?

#### Topic Modeling
 - What are The Weeknd's most popular song topics?

#### Vocabulary
 - How extensive is The Weeknd's vocabulary?
 - Has his common vocabulary expanded or changed in any way over time?
 - How many unique words does he use in each song? Could that be a potential measure for song repetitiveness?

#### Streams
 - How many streams does each of the Weeknd's songs have? 
 - Are there interesting correlations between a song's stream counts, and other variables in our dataset?

#### Part-of-Speech Tagging
 - Is their significant difference between albums or songs in parts-of-speech tagging?
 - Verb tense differences? Future looking songs as opposed to past reminiscing songs?
 - Most popular nouns?
 












