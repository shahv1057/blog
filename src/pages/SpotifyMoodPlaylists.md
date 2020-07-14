---
title: "Building Mood-Based Spotify Playlists using K-Means Clustering"
date: "2020-07-07"
---

<h1> Introduction </h1>

My music choices and preferences have always been a direct indicator of my current activity, mood, and emotional state. I listen to upbeat hip-hop songs while working out, soft pop music while I'm feeling moody or down, or something in between while working on my data science projects. This project is an attempt to use Machine Learning to identify those moods and build corresponding playlists for each.

If you're interested in my code, you can find it [here]!(https://github.com/shahv1057/SpotifyMoodPlaylists)


# Project Outline

This project has 4 distinct parts:

1) **Obtain Spotify Data**: Use the Spotify API to obtain all my music listening data from the past year.

2) **Music Taste Analysis**: Take a deep dive into my song, artist, and album preferences and how these preferences have fluctuated over the year.

3) **Mood Prediction**: Analyse audio features such as the ***acousticness***, ***tempo***, and ***instrumentalness*** of my song preferences and utilize the K-Means Clustering algorithim to stratify the music into different, defined moods.

4) **Playlist Curation**: Develop custom mood-specific Spotify playlists based on my music preferences and mood clusters from the last two parts.




# Obtaining Spotify Data

The first step is to obtain the data that will drive the rest of this project. This can be done with the following steps:

1) Visit https://www.spotify.com/us/account/privacy/ -- log into Spotify account and scroll to the bottom and request data.
2) Receive a downloadable zip file with listening data from Spotify's team in around 1-3 days
3) Use python's [Spotipy](https://spotipy.readthedocs.io/en/2.13.0/) package to access the Spotify API and load data into a Pandas Dataframe
4) Acquire Spotify's audio feature data for all my songs:

```python
# Create A Data Frame with Unique Song ID and corresponding song features
my_feature = pd.DataFrame(columns=[
    "song_id","energy","tempo","speechiness",
    "acousticness","instrumentalness","danceability",
    "loudness","valence"
    ])
# For each Song ID in my Spotify-provided listening history,
# import spotify's audio features in DataFrame
for song in songid:
    features = sp.audio_features(tracks = [song])[0]
    if features is not None:
        my_feature = my_feature.append({
            "song_id":song,
            "energy":features['energy'], 
            "tempo":features['tempo'],
            "speechiness":features['speechiness'],
            "acousticness":features['acousticness'],
            "instrumentalness":features['instrumentalness'],
            "danceability":features['danceability'],
            "loudness":features['loudness'],
            "valence":features['valence'],
            },ignore_index=True)

```

The Spotify API audio features are central to my analysis and mood clustering of my music preferences. Attributes like ***danceability*** and ***energy*** capture differences between faster and slower paced music, while ***speechiness*** quantifies each song's focus on words. A high ***valence*** indicates positive/happy /euphoric music while low ***valence*** quantifies dark/angry/sad music. A complete list of attributes and corresponding definitions can be found [here](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/).


# My Music Taste Analysis

To best display and understand my data, I utilized the ```Plotly``` package for interactive plotting. Let's take a look at some of my music from the past year.

## Top Songs

*After Hours*, by the Weeknd, tops the chart of my most listened to songs of the past year! Even though the song didn't come out till February, I clearly had it on repeat essentially through April. An interesting note about the song is that it is a 6+ minute song, much longer than the average song I listen to (3ish min.) and the measurement variable of "sum minutes listened" rather than "count of times listened" probably worked in its favor.

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/34.embed"></iframe>


## Top Artists

Post Malone, whom my dad lovingly refers to as, "Post Office Malone", came out as my top artist of the past year. There was a pretty constant stream of various Post songs over my last 12 months. In fact, all three of his albums show up on my top 20 albums list of the past year!

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/71.embed"></iframe>

## Top Albums 
<a name="albums"></a>

The Weeknd's *After Hours* album tops the chart of top albums of the past year, which makes a lot of sense thinking back to all the days of cycling through the album on repeat while messing around in my Jupyter Notebooks. Recently, you can see that Polo G's *The GOAT* has been occupying much of the Jupyter Notebook-ing time.

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/73.embed"></iframe>

# Using K-Means clustering to predict my different music-listening moods

To create distinct classes to group my musical moods, I use the **K-Means unsupervised learning algorthim**. 

The K-Means clustering algorithim is one of the most popular (and perhaps most intuitive) machine learning algorithims for classifying unlabeled data. It works in the following steps:

1) Choose number of centroids
2) Initalize the chosen number of centroids at random, or at specified data points.
3) Calculate the [Euclidian Distance](https://hlab.stanford.edu/brian/euclidean_distance_in.html) between each point and each centroid, and label each point by it closest centroid.
4) For each labeled group, the average point is calculated. This average point becomes the new centroid for the group
5) Step (3-4) occurs iteratively until the dataset converges (minimal points switching classes during step 3)

#### Repeating steps 3-5 until convergence on a 3-cluster, 2D dataset:
<img src="/Plots/K-means_convergence.gif" width="400" height="300" />

## Choose the number of clusters

This algorithim works very well, on the basis of choosing a number of centroids that represents the data. There are a few methods to choosing a number of clusters, and in this project I use the [elbow method](https://www.scikit-yb.org/en/latest/api/cluster/elbow.html), choosing the number of clusters at the knee of the graph of clusters x inertia (sum of squared distance)

I run the ```sklearn``` K-Means algorithim on my data set and ultimately choose 4 clusters based on the graph
#### Clusters x Inertia

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/49.embed"></iframe>

## Preprocess the Data

Now that I have an algorithim and process down, I begin the preprocessing of my data! To capture my true preferences, as opposed to songs I listened to for a minute and never again, I filter down my data to songs that I have listened to for more than 15 minutes in the past year.

#### Dataframe Snapshot
<style type="text/css">
.tg  {border-collapse:collapse;border-color:#9ABAD9;border-spacing:0;}
.tg td{background-color:#EBF5FF;border-bottom-width:1px;border-color:#9ABAD9;border-style:solid;border-top-width:1px;
  border-width:0px;color:#444;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:11px 3px;
  word-break:normal;}
.tg th{background-color:#409cff;border-bottom-width:1px;border-color:#9ABAD9;border-style:solid;border-top-width:1px;
  border-width:0px;color:#fff;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;
  padding:11px 3px;word-break:normal;}
.tg .tg-cip8{background-color:rgba(66, 165, 245, 0.2);font-size:10px;text-align:center;vertical-align:middle}
.tg .tg-nrw1{font-size:10px;text-align:center;vertical-align:top}
.tg .tg-t90x{background-color:#D2E4FC;font-size:10px;text-align:center;vertical-align:top}
.tg .tg-1tmr{background-color:rgba(66, 165, 245, 0.2);font-size:10px;font-weight:bold;text-align:center;vertical-align:middle}
.tg .tg-af8e{background-color:rgba(66, 165, 245, 0.2);font-size:10px;font-weight:bold;text-align:center;vertical-align:middle}
.tg .tg-3j8g{font-size:10px;font-weight:bold;text-align:center;vertical-align:top}
.tg .tg-bbc0{background-color:#D2E4FC;font-size:10px;font-weight:bold;text-align:center;vertical-align:top}
.tg .tg-70i9{background-color:rgba(66, 165, 245, 0.2);font-size:10px;text-align:center;vertical-align:middle}
<style type="text/css">
.tg  {border-collapse:collapse;border-color:#aabcfe;border-spacing:0;}
.tg td{background-color:#e8edff;border-color:#aabcfe;border-style:solid;border-width:1px;color:#669;
  font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{background-color:#b9c9fe;border-color:#aabcfe;border-style:solid;border-width:1px;color:#039;
  font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-hmp3{background-color:#D2E4FC;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
<table class="tg" style="undefined;table-layout: fixed; width: 880px">
<colgroup>
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
<col style="width: 80px">
</colgroup>
<thead>
  <tr>
    <th class="tg-0lax">Song</th>
    <th class="tg-0lax">Artist</th>
    <th class="tg-0lax">Album</th>
    <th class="tg-0lax">Energy</th>
    <th class="tg-0lax">Tempo</th>
    <th class="tg-0lax">Speechiness</th>
    <th class="tg-0lax">Acousticness</th>
    <th class="tg-0lax">Instrumentalness</th>
    <th class="tg-0lax">Danceability</th>
    <th class="tg-0lax">Loudness</th>
    <th class="tg-0lax">Valence</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-hmp3">No Option</td>
    <td class="tg-hmp3">Post Malone</td>
    <td class="tg-hmp3">Stoney (Deluxe)</td>
    <td class="tg-hmp3">0.734</td>
    <td class="tg-hmp3">0.238</td>
    <td class="tg-hmp3">0.057</td>
    <td class="tg-hmp3">0.075</td>
    <td class="tg-hmp3">0.000</td>
    <td class="tg-hmp3">0.575</td>
    <td class="tg-hmp3">0.805</td>
    <td class="tg-hmp3">0.494</td>
  </tr>
  <tr>
    <td class="tg-0lax">My Bad</td>
    <td class="tg-0lax">Khalid</td>
    <td class="tg-0lax">Free Spirit</td>
    <td class="tg-0lax">0.568</td>
    <td class="tg-0lax">0.244</td>
    <td class="tg-0lax">0.082</td>
    <td class="tg-0lax">0.543</td>
    <td class="tg-0lax">0.266</td>
    <td class="tg-0lax">0.645</td>
    <td class="tg-0lax">0.620</td>
    <td class="tg-0lax">0.391</td>
  </tr>
  <tr>
    <td class="tg-hmp3">The Show Goes On</td>
    <td class="tg-hmp3">Lupe Fiasco</td>
    <td class="tg-hmp3">Lasers</td>
    <td class="tg-hmp3">0.889</td>
    <td class="tg-hmp3">0.606</td>
    <td class="tg-hmp3">0.115</td>
    <td class="tg-hmp3">0.018</td>
    <td class="tg-hmp3">0.000</td>
    <td class="tg-hmp3">0.591</td>
    <td class="tg-hmp3">0.855</td>
    <td class="tg-hmp3">0.650</td>
  </tr>
  <tr>
    <td class="tg-0lax">Escape</td>
    <td class="tg-0lax">Kehlani</td>
    <td class="tg-0lax">SweetSexySavage</td>
    <td class="tg-0lax">0.688</td>
    <td class="tg-0lax">0.213</td>
    <td class="tg-0lax">0.079</td>
    <td class="tg-0lax">0.039</td>
    <td class="tg-0lax">0.000</td>
    <td class="tg-0lax">0.562</td>
    <td class="tg-0lax">0.787</td>
    <td class="tg-0lax">0.707</td>
  </tr>
</tbody>
</table>




#### Data Distributions

The first thing I noticed about each feature is that the distributions are all a bit different. Let's visualize this:

<iframe width="900" height="700" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/45.embed"></iframe>

A few impressions of the data:

- ***Instrumentalness*** is heavily skewed with almost only low values (More lyrical music and electronic beats, less jazz, rock, or heavy metal)
- ***Speechiness*** is also skewed toward lower values. More music, less podcasts, speeches, and other spoken word.
- ***Energy***, ***danceability***, and ***loudness*** features all have inherently similar, slightly skewed distributions
- ***Valence*** and ***tempo*** features seems to be the most evenly distributed from 0 to 1.


## Run the Algorithim

The data is ready to be fed through algorithim to develop the mood clusters!

```python
# Drop non-numeric columns
# Convert Dataframe to a numerical Numpy array
X = df.drop(['track_name','artist_name','album'],axis=1).values

# Fit data to 4 clusters using the sklearn K-Means algorithim
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=4,n_jobs=-1).fit(X)

# Predict and label mood for each song in Dataframe
kmeans_mood_labels = kmeans.predict(X)
df['label'] = kmeans_mood_labels
```

## Visualize the Results

My algorithim produced the following cluster value counts:


![Mood Group Counts](/Plots/moodsongcounts.png "")

#### PCA - 2D

Each song in my dataframe has 8 audio features, which essentially means the data is 8-dimensional. Because data cannot by visualized in 8 dimensions, I used a common dimensionality reduction technique called [Principal Component Analysis (PCA)](https://setosa.io/ev/principal-component-analysis/) to condense my data into 2 dimensions in a way that maintains as much of the original data's variance as possible.

Using ```sklearn```'s PCA package:

```python
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
principal_components = pca.fit_transform(X)
pc = pd.DataFrame(principal_components)
pc.columns = ['x', 'y','label']
```

(It is important to note that (x,y) coordinates plotted are a transformed representation of a combination of my 8 features, but **do not exhibit any direct intuition into the feature values**)

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/57.embed"></iframe>

By using PCA, I can see my data much more clearly. As shown in the plot, labels "2" and "3" are pretty well defined with not too much overlap, while labels "0" and "1" have a large amount of overlap.

```python 
Input: print (pca.explained_variance_ratio_ , sum(pca.explained_variance_ratio_))
```

```python 
Output: array([0.32387322, 0.22293707]), 0.5468
```

Using the above PCA attribute, I see that 32% of my data's original variance was explained by the 1st component while 22% is explained by the 2nd. Altogether, my PCA reduced the dimensionality the 8 features while maintaining around 54% of the original variance.

#### PCA - 3D

Next, I reran my PCA function, this time with three components, using ```Plotly```'s 3D Scatter Plot functionality to display my data. The cluster stratifications are much clearer now, with the 3rd component capturing an extra 17.5% of the original data's variance. This 3-component transformation of the 8 feature data exhibits a much clear visual cluster distinction while maintaining more than 77% of the original variance.

```python
pca = PCA(n_components=3)
principal_components = pca.fit_transform(X)
pc = pd.DataFrame(principal_components)
pc.columns = ['x', 'y', 'z', 'label']
```

```python 
Input: print (pca.explained_variance_ratio_ , sum(pca.explained_variance_ratio_))
```

```python 
Output: array([0.32387322, 0.22293707, 0.17594222]), 0.7226
```

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/61.embed"></iframe>

## Results

Now that I've analysed my mood clusters, I am going to try and define each mood! To do this, I will do the following:
1) Summarize the cluster's audio feature statistics
2) Try to define a respresentative mood
3) Look at a sample of the song data for manual confirmation

First, I scale all of my data features using the ```sklearn``` [Standard Scaler](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html). The scaler will transform each audio feature value such that each audio feature has a mean of 0 and variance of 1 across all songs in the feature column. This will allow for a much clearer visualization of comparing features for each cluster.

I now visualize the feature differences using ```seaborn```'s heatmap plot:

![Features](/Plots/featureheatmap.png "Logo Title Text 1")


### Cluster 0: HYPE mood

![Hype](/Plots/hype.gif "Hype")


Cluster 0 seems to be exciting, fast paced songs with a lot of words. Its audio features are:

- Very High Speechiness and Tempo
- High Loudness and Energy
- Semi-Low Danceability

These audio features point to the mood cluster contain a lot of **Lyrical**, **Hype** **Rap** songs.
A quick random sample immediately confirms that:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-z4ch{font-family:Georgia, serif !important;;font-size:11px;text-align:center;vertical-align:top}
.tg .tg-6qyr{background-color:rgba(66, 165, 245, 0.2);font-family:Georgia, serif !important;;font-size:11px;text-align:center;
  vertical-align:middle}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-z4ch">Song</th>
    <th class="tg-z4ch">Artist</th>
    <th class="tg-z4ch">Album</th>
    <th class="tg-z4ch">Label</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6qyr">iPHONE (with Nicki Minaj)</td>
    <td class="tg-6qyr">DaBaby</td>
    <td class="tg-6qyr">KIRK</td>
    <td class="tg-6qyr">0</td>
  </tr>
  <tr>
    <td class="tg-6qyr">XO Tour Llif3</td>
    <td class="tg-6qyr">Lil Uzi Vert</td>
    <td class="tg-6qyr">Luv Is Rage 2</td>
    <td class="tg-6qyr">0</td>
  </tr>
  <tr>
    <td class="tg-6qyr">I'm Goin In</td>
    <td class="tg-6qyr">Drake</td>
    <td class="tg-6qyr">So Far Gone<br></td>
    <td class="tg-6qyr">0</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Flex (feat. Juice WRLD)</td>
    <td class="tg-6qyr">Polo G</td>
    <td class="tg-6qyr">THE GOAT</td>
    <td class="tg-6qyr">0</td>
  </tr>

</tbody>
</table>

### Cluster 1: ANGSTY mood

![angsty](/Plots/angsty.gif "angsty")

Cluster 1 is perhaps the most ambiguous mood cluster. Its audio features are:

- Very Low Tempo and Valence
- Low Instrumentalness and Acousticness
- Average Energy and Danceability

These songs are not particularly positive, but are not instrumental/acoustic sad songs either. The average energy and danceability makes me feel like the cluster's songs are catchy but a little more angsty and not quite as hype as Cluster 0.

These audio features point to the mood cluster containing a lot of **Moody Pop/R&B Songs**.
Here's a random sample of songs in the cluster:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-z4ch{font-family:Georgia, serif !important;;font-size:11px;text-align:center;vertical-align:top}
.tg .tg-6qyr{background-color:rgba(66, 165, 245, 0.2);font-family:Georgia, serif !important;;font-size:11px;text-align:center;
  vertical-align:middle}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-z4ch">Song</th>
    <th class="tg-z4ch">Artist</th>
    <th class="tg-z4ch">Album</th>
    <th class="tg-z4ch">Label</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6qyr">One Dance</td>
    <td class="tg-6qyr">Drake</td>
    <td class="tg-6qyr">Views</td>
    <td class="tg-6qyr">1</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Too Late</td>
    <td class="tg-6qyr">The Weeknd</td>
    <td class="tg-6qyr">After Hours</td>
    <td class="tg-6qyr">1</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Own It (feat. Ed Sheeran)</td>
    <td class="tg-6qyr">Stormzy</td>
    <td class="tg-6qyr">Heavy Is The Head<br></td>
    <td class="tg-6qyr">1</td>
  </tr>
  <tr>
    <td class="tg-6qyr">EARFQUAKE</td>
    <td class="tg-6qyr">Tyler, The Creator</td>
    <td class="tg-6qyr">IGOR</td>
    <td class="tg-6qyr">1</td>
  </tr>

</tbody>
</table>


### Cluster 2: HAPPY mood

![Happy](/Plots/happy.gif "Happy")

Cluster 2 was similar to Cluster 0 in loudness and energy, though specifically different in speechiness and danceability. Its audio features are:

- Very High Danceability and Valence
- High Loudness and Energy
- Low Instrumentalness

These songs are happy and exciting and make you want to dance. However, unlike Cluster 0, the songs do not have a high speechiness. 

These audio features point to the mood cluster contain a lot of **Upbeat Happy Pop** - catchy songs you can sing and dance to. Here's a random sample of songs in the cluster:

</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-z4ch">Song</th>
    <th class="tg-z4ch">Artist</th>
    <th class="tg-z4ch">Album</th>
    <th class="tg-z4ch">Label</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6qyr">Medicated (feat. Chevy Woods & Juicy J)</td>
    <td class="tg-6qyr">Wiz Khalifa</td>
    <td class="tg-6qyr">O.N.I.F.C. (Deluxe)</td>
    <td class="tg-6qyr">2</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Break My Heart</td>
    <td class="tg-6qyr">Dua Lipa</td>
    <td class="tg-6qyr">Future Nostalgia</td>
    <td class="tg-6qyr">2</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Loyal (feat. Lil Wayne & Tyga)</td>
    <td class="tg-6qyr">Chris Brown</td>
    <td class="tg-6qyr">X (Expanded Edition)<br></td>
    <td class="tg-6qyr">2</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Juice</td>
    <td class="tg-6qyr">Lizzo</td>
    <td class="tg-6qyr">Cuz I Love You</td>
    <td class="tg-6qyr">2</td>
  </tr>

</tbody>
</table>

### Cluster 3: GLOOMY/EMOTIONAL mood

![Sad](/Plots/sad.gif "Sad")


Cluster 3 was probably the easiest mood for me to identify. Here are the audio features:

- Very High Acousticness and Instrumentalness
- Very Low Loudness and Energy
- Low Danceability and Speechiness

These songs are slow and emotional. The audio features point to the mood cluster containing songs in a mood I would probably call my **Sad Boi Hours**. Here's some sample songs:

</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-z4ch">Song</th>
    <th class="tg-z4ch">Artist</th>
    <th class="tg-z4ch">Album</th>
    <th class="tg-z4ch">Label</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-6qyr">Vertigo</td>
    <td class="tg-6qyr">Khalid</td>
    <td class="tg-6qyr">Suncity</td>
    <td class="tg-6qyr">3</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Hold Me By The Heart</td>
    <td class="tg-6qyr">Kehlani</td>
    <td class="tg-6qyr">SweetSexySavage (Deluxe)</td>
    <td class="tg-6qyr">3</td>
  </tr>
  <tr>
    <td class="tg-6qyr">Summer Friends (feat. Jeremih & Francis & The Lights)</td>
    <td class="tg-6qyr">Chance the Rapper</td>
    <td class="tg-6qyr">Coloring Book<br></td>
    <td class="tg-6qyr">3</td>
  </tr>
  <tr>
    <td class="tg-6qyr">FourFiveSeconds</td>
    <td class="tg-6qyr">Rihanna</td>
    <td class="tg-6qyr">FourFiveSeconds</td>
    <td class="tg-6qyr">3</td>
  </tr>

</tbody>
</table>

# Creating Mood-Based Playlists in Spotify

Using ```Spotipy```'s playlist access with the scope "playlist-modify-public", it is possible to create Spotify playlists right from a Jupyter Notebook!

```python
from spotipy.oauth2 import SpotifyOAuth

scope = 'playlist-modify-public'
token = util.prompt_for_user_token(username=username, 
                                   scope=scope, 
                                   client_id=client_id,   
                                   client_secret=client_secret,     
                                   redirect_uri=redirect_uri)

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id,client_secret,redirect_uri,scope=scope,username=username))
```
```python
def create_mood_playlists(moods, df, num_clusters, playlist_length):
    '''
    Input: List of defined moods, features df, number of clusters, len of desired playlist
    Output: Spotify Playlist
    '''
    for moodnum in range(num_clusters):
        mood_data = df[df.label==moodnum]
        sp.user_playlist_create(username, moods[moodnum])      
        playlist_id = sp.user_playlists(username)['items'][0]['id']
        playlist_song_IDs = list(mood_data['track_id'].sample(playlist_length))
        sp.user_playlist_add_tracks(username, playlist_id, list(playlist_song_IDs))
        
moods = ['Hype','Angsty','Happy','Sad']
num_clusters = 4
playlist_length = 20

create_mood_playlists(moods, song_prefs, num_clusters, playlist_length)
```

**Check 'em out!**

<img src="/Plots/HypePlaylist.png" width="400" height="300" />
<img src="/Plots/AngstyPlaylist.png" width="400" height="300" />
<img src="/Plots/HappyPlaylist.png" width="400" height="300" />
<img src="/Plots/SadPlaylist.png" width="400" height="300" />


# Next Steps 
Build a Web App that, when given Spotify username and token access info, the app will run the K-Means Algorithim, create defined moods, and then build custom mood-specific playlists for the user directly in the Spotify app.

## Thanks For Reading!














