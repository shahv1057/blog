---
title: "Automating Plot Updates with Crontab"
coverimage: "/Plots/automationcover.jpg"
date: "2020-10-14"
description: "Schedule specified shell commands to periodically run files, collect live data, and update data visualizations and dashboards..."
---

<h2>Introduction</h2>

A few months ago, I built my first every Plotly interactive dashboard displaying state-specific COVID-19 data. The dashboard looked great on that first day, but the following day I realized my plot was now missing this new day's data. So, I manually imported the live data, updated my [dashboard](https://veeraldoesdata.com/covid-dashboard/), and re-uploaded it to my website.

**Quickly, I realized I would need to do this every day to display live data**

There had to be a better way. After looking into automation, I discovered **_crontab_**, a configuration file in Terminal to schedule shell commands.

## Write a script to import live data and update plots

First step is to write a script that imports the periodically updated data set at its most recently updated state and uses that data to build out visualizations and save them to your local computer

In Python, it may look something like this:

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('myLiveData.csv')

plt.plot(df['x'],df['y'])
plt.save('~/Desktop/Downloads/plots/myLivePlot.png')
```

## Set up Crontab editor

The crontab editor can be accessed through a Terminal using the _crontab -e_ command. Press "i" to start to editing the document.

Crontab commands are structured as follows:

**MIN HOUR DOM MON DOW COMMAND**

`MIN: Minute field (0 to 59)`
<br>
`HOUR: Hour field (0 to 23)`
<br>
`DOM: Day of Month (1-31)`
<br>
`MON: Month field (1-12)`
<br>
`DOW: Day Of Week (0-6)`

Some other useful notes:
<br>
`* = any value`
<br>
`, = value list separator`
<br>
`- = range of values`
<br>
`/ = step values`
<br>
`&& = and (add another command)`

### Some Basic Examples:

`* * * * * echo hi` - print "hi" in Terminal every minute of every hour of every day.
<br>
<br>
`0 8 * * 1-5 /Desktop/scripts/WeekdayScript.sh && echo Done` - run WeekdayScript.sh each day Monday through Friday at 8am and print "Done" when finished.

For more details on crontab syntax, check out [Crontab Guru](https://crontab.guru)!

## Write crontab commands to automate plot updates

Final step is set up your crontab editor to run your python script as often as desired. In my case, the data I was using was updated every 3 to 6 hours and I was hosting my plot on Github. Therefore, I set up individual crontab commands to run my python file, and add, commit, and push plot changes to Github

I suggest using full paths for all commands, as crontab can be buggy when it comes to finding particular files or directories without explicity defined paths. This includes commands like python or git, that typically do not require full paths when using Terminal.

_At the 0th minute of every 3rd hour run command: python buildLivePlot.py_
<br>
`0 */3 * * * ~/opt/anaconda3/bin/python ~/Desktop/PyScripts/buildLivePlot.py`
<br>
<br>
_At the 5th minute of every 3rd hour, run command: "git add myLivePlot.png" in local repository_
<br>
`5 */3 * * * cd ~/Desktop/Downloads/plots/ && /usr/bin/git add ~/Desktop/Downloads/plots/myLivePlot.png`
<br>
<br>
_At the 6th minute of every 3rd hour, run command: "git commit -m 'Daily Update'" in local repository_
<br>
`6 */3 * * * cd ~/Desktop/Downloads/plots/ && /usr/bin/git commit -m "Daily Update"`
<br>
<br>
_At the 7th minute of every 3rd hour, run command: "git push origin master" in local repository_
<br>
`7 */3 * * * cd ~/Desktop/Downloads/plots/ && /usr/bin/git push origin master`

And that's it! Every 3 hours, the plots will automatically update with live data in the background of your running computer and you'll never have to manually update them again. Check out my [COVID-19 Dashboard](https://veeraldoesdata.com/covid-dashboard/) to see my crontab scheduled updates in action!
