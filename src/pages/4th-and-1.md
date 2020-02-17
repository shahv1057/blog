---
title: "4th and 1"
date: "2020-02-14"
---

### Intro/Motivation

4th Down. 1 yard to the endzone. ~30 seconds left in the half of the Super Bowl. The Philadelphia Eagles have a choice to either kick a relatively easy field goal and take 3 points, or go for the touchdown and risk coming away with nothing before the half.

That iconic situation preceded perhaps the most memorable play in recent Super Bowl history, "The Philly Special". However, there was a similarly important and less known 4th Down choice that the Eagles had later in that game. 4th Down and 2 on the PHI 45, 5:39 left in the 4th quarter down 33-32. In this situation, the stakes where higher and the margin of error was lower so late in the game.

So should the Eagles go for it? If so, should they pass it or run it? What type of play should the Patriots defense have expected in that situation?

These questions can be answered through coaches' debates, understanding of the game, or even the subjective feel. Doug Pederson, the Eagles coach, ignored all of these and instead chose data. What does the data say?

To answer that, we're going to need to take a closer look:

### A First Look

First instinct is to take a look at how often teams go for it on 4th downs.

<<<<<<< HEAD:src/pages/links.md
![alt text](/Plots/4thdownatt_barplot.png "Logo Title Text 1")
=======
![Logo Title Text 1](/Plots/4thdownatt_barplot.png)
>>>>>>> 0f614d1e92690637b23e74a53e6dac7710eb04bd:src/pages/4th-and-1.md

Clearly, teams around the league have been increasingly inclined to go for it in 4th downs. However, this general trend has differed across different teams.

Below we can see the differences between various teams in their willingness to attempt a 4th down conversion through the last five years. The Eagles (PHI) clearly stand out, consistently going for it on 4th downs more often than most of the league since 2016, the year Coach Pederson was hired.

![alt text](/Plots/4thdownatt_heatmap.png "Logo Title Text 1")

This paints a picture, but ultimately what a coach needs to make that key Super Bowl decision is an anaytical model that guides his decision making and play choice in these incredibly significant game moments.

### The Model

#### The Situation

- 4th and 2 at OPP 43 yard line
- 4rd and 1 at OWN 38 yard line
- 4th and 5 at OPP 12 yard line
- 4rd and Goal at OPP 2 yard line

These are just a few in-game 4th down situations that could arise within an NFL game. The decisions made in these situations can often be game-altering.

Given a 4th Down situation, consisting Yards to Go, and Yardline, and time left in the half, what should a coach choose to do?

First, lets attempt to define a specific situation.

- 4th Down
- 0-5 Yards to Go

In the last 5 NFL seasons, there have been 7881 4th and (0-5) yards-to-go situations with an average of 2.847 yards to go at an average yardline position of the OPP 45 yard line.

![alt text](/Plots/FootballField1.png "Logo Title Text 1")

In these situations, there have been approximately 1800 conversion attempts, 1900 field goal attempts, and 4000 punts

The 4th down conversion attempts can then be further split into:

- 1813 attempts
  - 192 Touchdowns
  - 795 First Downs
  - 54.4% Conversion Rate (First Down or Touchdown)
- 1053 pass attempts
  - 109 Touchdowns
  - 384 First Downs
  - 46.8% Conversion Rate (First Down or Touchdown)
- 760 rush attempts
<<<<<<< HEAD:src/pages/links.md
    - 83 Touchdowns
    - 411 First Downs
    - 62.5% Conversion Rate (First Down or Touchdown)

### Machine Learning framework

I am interested in the question of whether or not to attempt to convert a 4th down situation. This is a binary classification problem of:

#### Kick a field goal or punt (val=0)
##### OR
#### Run a Pass/Run play to convert a First Down or Touchdown (val=1)  
&nbsp;  
Therefore, I will be using various classification learning algorithims to attempt to best create a tool for analytically predicting decision making choices in 4th down situations. 

I'm going to need to transform my data set. Here are the steps I need to take:

1) Group my PlayType variable into a binary 0 or 1 variable
2) Identify the variables that I believe will impact the decision
3) Make sure all variables are numeric or binary to make my algorthim work seamlessly

- First -- Grouping
    - PlayType == FIELD GOAL or PUNT = 0
    - PlayType == PASS or RUSH or SCRAMBLE or SACK = 1

- Second -- Feature Selection
    - ToGo
    - Yardline
    - TimeLeftInHalf
    - Half













=======
  - 83 Touchdowns
  - 411 First Downs
  - 62.5% Conversion Rate (First Down or Touchdown)
>>>>>>> 0f614d1e92690637b23e74a53e6dac7710eb04bd:src/pages/4th-and-1.md

[NFL PlaybyPlay GitHub Repo](https://github.com/shahv1057/NFL_PBP)
