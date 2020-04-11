---
title: "How to Make an Animated Plot"
date: "2020-04-10"
---

**Have you ever wondered to how to make something like this:**
![debatepic](/Plots/COVIDPlots/CTY-bar-ani.gif "Logo Title Text 1")
<br/><br/>
**or maybe even something like this:**
![debatepic](/Plots/COVIDPlots/MapAnimations/counties_outlines.gif "Logo Title Text 1")

## Introduction

Animated plots are both exciting to make and mesmerizing to watch. Today, I will be writing a quick tutorial on how to build and output one of these plots using Python.

## Prerequisites

You'll need a bit of rudimentary Python knowledge, and the following packages:
- Pandas
- Numpy
- Matplotlib
- Datetime

That's it! Make sure you have those packages installed and imported and let's get started!

## Collect and Organize your Data 

For almost any data source, Pandas has a tool to import that data into a Dataframe in Python. The package can read data from a CSV file, JSON file, TXT file, Excel file, HTML file, etc. and organize it for you into your Dataframe. Link [**here**](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html) for specific documentation. Your dataframe should look something like this:

![debatepic](/Plots/COVIDdfexample.png "Logo Title Text 1")

## Dates

Identify your **date** variable.

Animated plots are particularly useful in understand the changes in data over a certain time period. Define your time period, and reclassify the dates in your dataset as Python Datetime variables:

```
df['date'] = pd.to_datetime(df['date'])
```

## Choose Graph Type

What Graph best visualizes your data. Bar graphs often display categorical x-variables and numeric y-variables well. Scatter and Line plots can be useful for numeric x and y variables.

## Build your update function

Your update function will iterate through your chosen dates, and create a static plot at that date. Your each iteration, you want to redefine your data as the data at that date. Then, you want to plot that data, and then move on to the next date. Your update function will look like:

```
def update(date):
    data = df[df['date']]
    x = data['state']
    y = data['cases']
    data.plot(x, y, kind=bar)

```

