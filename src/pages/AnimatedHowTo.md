---
title: "Using Animated Plots"
description: "How to create an animated bar plot"
date: "2020-04-10"
---

## Introduction

I've been working alongside a team of people to collect and analyze data relating to the impact and response to COVID-19 over the past few weeks. When trying to convey the changes in collected responses over time, I've found it especially useful to use animated plots like these: 

![debatepic](/Plots/COVIDPlots/CTY-bar-ani.gif "Logo Title Text 1")
![debatepic](/Plots/COVIDPlots/MapAnimations/counties_outlines.gif "Logo Title Text 1")

This post is about how to create such plots that convey trends in data over time in an accessible and informative manner.

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
my_df['date'] = pd.to_datetime(my_df['date'])
```

## Choose Graph Type

What type of graph best visualizes your data? Bar graphs often display categorical x-variables and numeric y-variables well. Scatter and Line plots can be useful for numeric x and y variables.

## Build your Update Function

Your update function will iterate through your chosen dates, and create a static plot image at that date. Through each iteration, you want to redefine your dataset to filter for rows at that date. Then, you want to plot that data, and then move on to the next date. Your update function will look like:

```
def update(my_df,date):
    # Filters dataframe to rows at the date
    data = my_df[my_df['date']]

    # Assigns filtered data to x,y variables
    x = data['state']
    y = data['cases']

    # Creates matplotlib figure and axes to plot graph
    fig, ax = matplotlib.pyplot.subplots(1,1,figsize=(9, 6))
    ax.bar(x, y)

    # Adds figure title as the date of that iteration
    fig.suptitle(date)

```

## Create your Animation

To create your animation, I suggest you use the FuncAnimation function from theMatlplotlib's animation package. You will need to set the following parameters:

fig: figure object of your graph
func: your update function
frames: a list for your update function to iterate through. In this case, a list your dates sorted chronologically
interval: Delay between frames in milliseconds.
repeat: Boolean that controls whether or not you animation repeats from the beginning after iterating through all dates
repeat_delay: If the animation in repeated, adds a delay in milliseconds before repeating the animation.


You can save your animation as a .mov, .mp4, or .gif file in your local path. Your animation function should look something like:
```
anim = matplotlib.animation.FuncAnimation(fig=fig, func=update, frames=date_list, interval=1000, repeat=True, repeat_delay=2000)

anim.save(local_path+'myanim.gif')"
``` 









