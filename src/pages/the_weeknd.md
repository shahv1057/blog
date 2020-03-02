---
title: "Has the Weeknd's music changed? An analytical look into his music over the years"
date: "2020-02-22"
---

### Intro

The Weeknd has had an incredible amount of success over the last few years. Songs like "Earned It", "The Hills", "Can't Feel My Face", "Starboy", "I Feel It Coming", and many more songs have dominated top charts on popular streaming services like Spotify and Apple Music. His mix of Pop, Hip Hop, and R&B has clearly left a mark.

What is it about The Weeknd's music that has skyrocketed his success? The soothing smoothness of his iconic voice? Perhaps his incredible vocal range?

I used to believe that The Weeknd possessed some intangible characteristic that really couldn't be explained. However, after starting to learn about **Natural Language Processing (NLP)** I began to question that thought. Was there an analytical method behind understanding The Weeknd's musical brilliance and streaming success? How has his music evolved over time? How does his music analytically differ from songs from other similar artists?

### Natural Language Processing

Natural Language Processing, or NLP, refers to the process of using a computer to read, understand, and extract useful analytical data from human language.

### Preprocessing

There are several steps that need to be taken before NLP analyses can even begin. Here's a broad overview of my key steps:

1) Import relevant data cleaning, analysis, visualization, and NLP packages
 - Pandas, NumPy, Matplotlib, Wordcloud, nltk, re, string, sklearn
2) Import data
 - In this case, that means importing the lyrics of ecah song from the each of the Weeknd's four released albums
3) Clean the data
 - The only way to utilize NLP techniques to analyze human language is to clean and adjust the data to make it amenable to NLP function
4) Build Pandas DataFrame
5) Feature Engineer relevant variables

**AND THEN**

Start Analysis

### Data Collection

Before anything can begin, I need to collect my data. In the case of musical NLP analysis, that data lies in song lyrics.

There are a few methods I considered for my collection. One was BeautifulSoup4, a web parser package which I could use to pull lyrics from various lyrics provider sites like [https://genius.com].

However, rather than manually find websites to pull from, I decided to utilize the PyLyrics package, a program written with the specific purpose of retrieving lyrics.

```
from PyLyrics import *
starboy = ["Starboy","Party Monster","False Alarm","Reminder",...]
wknd = 'The_Weeknd'
for song in starboy:
    lyr.append(PyLyrics.getLyrics(wknd,song))
```

Above is an example of the code I ran to acquire lyrics for every song in an album. Inputting and artist and song name into the getLyrics() function outputted the songs lyrics.

I proceeded to concatenate all lyrics and organize the songs into a Pandas DataFrame. After collection and intital organization, the DataFrame looked like this:

![debatepic](/Plots/weeknd_df_head.png "Logo Title Text 1")
![debatepic](/Plots/weeknd_df_head.png "Logo Title Text 1")

### Cleaning

NLP requires clean text data. More specifically, it requires punctuation-free, lowercase text to standardize analysis. To make these changes, I built a simple data cleaning function:

```
def clean_data(series):
    ### Cleans lyrical data by getting rid of non-alphanumeric characters, and lowercasing all words.
    series = series.str.replace('[(),.?]','')
    series = series.str.replace('-|\s+',' ')
    series = series.str.lower()
    return series
```

This function converts this:

```
"I'm tryna put you in the worst mood, ah\nP1 cleaner than your church shoes, ah\nMilli point two just to hurt you, ah\nAll red Lamb' just to tease you, ah\n\nNone of these toys on lease too, ah\nMade your whole year in a week too, yah\nMain bitch out of your league too, ah\nSide bitch out of your league too, ah\n\nHouse so empty, need a centerpiece\n20 racks a table cut from ebony\nCut that ivory into skinny pieces\nThen she clean it with her face\nMan, I love my baby\n\nYou talking money, need a hearing aid\nYou talking 'bout me, I don't see the shade\nS"
```

**into:**

```
"i'm tryna put you in the worst mood ah p1 cleaner than your church shoes ah milli point two just to hurt you ah all red lamb' just to tease you ah none of these toys on lease too ah made your whole year in a week too yah main bitch out of your league too ah side bitch out of your league too ah house so empty need a centerpiece 20 racks a table cut from ebony cut that ivory into skinny pieces then she clean it with her face man i love my baby you talking money need a hearing aid you talking 'bout me i don't see the shade"
```

Much cleaner!!

### Feature Engineering

Ok, at this point I have a Pandas Dataframe with columns for Album, Song, and Lyrics, with the lyrics stripped of all punctuation and capitalization.

Next, I need to engineer some new columns from my data to have more interesting variables to analyze.

This is where some project-relevant thought comes in. What features can I engineer from my data? What new variables could be particularly interesting, or perhaps shed light on interesting trends? Are there other variables relevant to songs that could be imported in to do further research?

1) Word Counts
 - How many times does The Weeknd say "Starboy" in the song "Starboy"?
 - How often does he curse? 
 - What are his most popular words in each of his albums?

2) Vocabulary
 - How extensive is The Weeknd's vocabulary?
 - Has his common vocabulary expanded or changed in any way over time?
 - How many unique words does he use in each song? Could that be a potential measure for song repetitiveness?

 3) Streams
  - How many streams does each of the Weeknd's songs have? 
  - Are there interesting correlations between a song's stream counts, and other variables in our dataset?

### Dataset Grouping

Analyzing songs is very useful, but what if want to detect generalized differences across albums? It would be helpful to build a Album-centric DataFrame!









