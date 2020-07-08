---
title: "Building Mood-Based Spotify Playlists using K-Means Clustering"
date: "2020-07-07"
---

<h1> Introduction </h1>

My music choices and preferences have always been a direct indicator of my current activity, mood, and emotional state. These choices include upbeat hip-hop songs while working out, soft pop music while I'm feeling moody or down, or something in between while working on my data science projects. 

# Project Outline

This project has 4 different parts:

1) **Obtain Spotify Data**: Use the Spotify API to obtain all my music listening data from the past year

2) **Music Taste Analysis**: A deep dive into my song, artist, and album preferences and how these preferences have fluctuated over the months

3) **Mood Prediction**: I take a look at audio features such as the acousticness, tempo, and instrumentalness of my song preferences and utilize the KMeans Clustering unsupervised learning algorithim to stratify my music into different, identifiable moods

4) **Playlist Curation**: Develop custom mood-specific Spotify playlists based on my music preferences and mood stratifications from the last two parts



# Obtaining Spotify Data

The first step is to obtain the data that will drive the rest of this project. I did this with the following steps:

1) Went to https://www.spotify.com/us/account/privacy/ -- logged into my account and scrolled to the bottom and requested my data.
2) Received a downloadable zip file with my data from Spotify's team after ~48 hours
3) Built a Python [script](veeraldoesdata.com) utilizing the [Spotipy](https://spotipy.readthedocs.io/en/2.13.0/) library to access the Spotify API and load my data into a Pandas Dataframe
4) Acquired Spotify's audio features for all my songs:

```python
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, 
                                                      client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

my_feature = pd.DataFrame(columns=["song_id","energy", "liveness","tempo","speechiness",
                                "acousticness","instrumentalness","danceability",
                                "duration_ms","loudness","valence",
                                "mode","key"])

for song in songid:
    features = sp.audio_features(tracks = [song])[0]
    if features is not None:
        my_feature = my_feature.append({"song_id":song,
                                    "energy":features['energy'], 
                                    "tempo":features['tempo'],
                                    "speechiness":features['speechiness'],
                                    "acousticness":features['acousticness'],
                                    "instrumentalness":features['instrumentalness'],
                                    "danceability":features['danceability'],
                                    "loudness":features['loudness'],
                                    "valence":features['valence'],
                                 },ignore_index=True)
    else:
        pass
```


The audio features loaded from the Spotify API will be central to my analysis and mood clustering of my music preferences. Attributes like ***danceability*** and ***energy*** capture differences between faster and slower paced music, while ***speechiness*** quantifies each song's focus on words. Additionally, I include each song's ***acousticness***, as well as it ***valence*** (high *valence* is positive/happy/euphoric music, low *valence* is dark/angry/sad music). A complete list of attributes and corresponding definitions can be found [here](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/).


# My Music Taste Analysis

To best display and understand my data, I utilized the ```Plotly``` package for interactive plotting. Let's take a look at some of my music from the past year.

## Top Songs

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/34.embed"></iframe>

## Top Artists

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/39.embed"></iframe>

## Top Albums

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/41.embed"></iframe>


# Using K-Means clustering to predict my different music-listening moods

## Algorithim

To create distinct classes to group my musical moods, I utilize the **K-Means unsupervised learning algorthim**. 

The K-Means clustering algorithim is one of the most popular (and perhaps most intuitive) machine learning algorithims for classifying unlabeled data. It works in the following steps:

1) Choose number of centroids
2) Initalize the chosen number of centroids at random, or at specified data points.
3) Calculate the [Euclidian Distance](https://hlab.stanford.edu/brian/euclidean_distance_in.html) between each point and each centroid, and each point is given the label of its closest centroid
4) For each labeled group, the average point is calculated. This average point becomes the new centroid for the group
5) Step (3-4) occurs iteratively until the dataset converges (minimal points switching classes during step 3)

### Visualized example of a K-Means algorithim  (Steps 3-5)
<img src="/Plots/K-means_convergence.gif" width="400" height="300" />

## Choosing number of clusters

This algorithim works very well, on the basis of choosing a number of centroids that represents the data. There are a few methods to choosing a number of clusters, and in this project I use the [elbow method](https://www.scikit-yb.org/en/latest/api/cluster/elbow.html), choosing the number of clusters at the knee of the graph of clusters x inertia (sum of squared distance)

I run the sklearn Kmeans algorithim on my data set and ultimately choose 4 clusters based on the graph

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/49.embed"></iframe>

## Data Preprocessing

Now that I have an algorithim and process down, I begin the preprocessing of my data! To capture my true preferences, as opposed to songs I listened to for a minute and never again, I filter down my data to songs that I have listened to for more than 15 minutes in the past year.

#### Dataframe Screenshot
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

- The ***instrumentalness*** has almost exclusively low values in my dataset. This makes sense has I listen to a lot of lyrical music and very few genres that have high instrumentalness like jazz, rock, or heavy metal.
- The ***speechiness*** features are  heavily skewed toward lower values. This generally makes sense, as high levels of speechiness include podcasts, speeches, and other spoken word, none of which I listen to.
- The ***acousticness*** features are also heavily skewed toward lower values. This also makes sense, as I listen to a lot of Hip Hop, Rap, and R&B music that usually does not feature acoustic instruments or sounds.
- The ***energy***, ***danceability***, and ***loudness*** features all have similar, slight skewed distributions, which makes a lot of sense because of the inherent similarities of the features.
- The ***valence*** and ***tempo*** features seems to be most evenly distributed from 0 to 1.

#### Preprocessing Summary

- Only songs I've listened to for 15+ minutes in the past year
- 4 mood clusters
- 8 audio features

## Running the Algorithim

```python
# Drop Non-Numeric columns, convert Dataframe to a Numerical Numpy Array
X = df.drop(['track_name','artist_name','album'],axis=1).values

# Fit sklearn K-Means algorithim to data
kmeans = KMeans(n_clusters=4,n_jobs=-1).fit(X)

# Predict and label mood for each song in Dataframe
kmeans_mood_labels = kmeans.predict(X)
df['label'] = kmeans_mood_labels
```

## Visualize Results

#### Songs in Each Mood Cluster

My algorithim produced the following cluster value counts:
 - **0**: 128
 - **1**: 204
 - **2**: 199
 - **3**: 100


#### PCA

Each song in my dataframe has 8 audio features, which essentially means the data is 8-dimensional. Because data cannot by visualized in 8 dimensions, I used a common dimensionality reduction technique called [Principal Component Analysis (PCA)](https://setosa.io/ev/principal-component-analysis/) to essentially "summarize" my data in 2D, PCA works by reducing the dimensionality of the data to 2D in a way that maintains as much of the original variance as possible. This technique allows me to visually explore my labeled, multi-dimensional data on a simple x,y graph.

Using sklearn's PCA package:

```python
pca = PCA(n_components=2)
principal_components = pca.fit_transform(X)
pc = pd.DataFrame(principal_components)
pc.columns = ['x', 'y','label']
```

(It is mportant to note that x,y coordinates are a representation of a combination of my 8 features, but **do not exhibit any direct intuition into the feature values**)

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/57.embed"></iframe>

By using PCA, I can see my data much more clearly. As shown in the plot, labels "2" and "3" are pretty well defined with not too much overlap, while labels "0" and "1" have a large amount of overlap.

```python 
Input: pca.explained_variance_ratio_ 
```

```python 
Output: array([0.32387322, 0.22293707])
```

Using the above PCA attribute, I see that 32% of my data's original variance was explained by the 1st component while 22% is explained by the 2nd.

Next, I reran my PCA function, this time with three components, using Plotly's 3D Scatter Plot functionality to display my data. The cluster stratifications are much clearer now, with the 3rd component capturing an extra 17.5% of the original data's variance!

```python
pca = PCA(n_components=3)
principal_components = pca.fit_transform(X)
pc = pd.DataFrame(principal_components)
pc.columns = ['x', 'y','z','label']
```

```python 
Input: pca.explained_variance_ratio_ 
```

```python 
Output: array([0.32387322, 0.22293707, 0.17594222])
```

<iframe width="900" height="600" frameborder="0" scrolling="no" src="//plotly.com/~shahv1057/61.embed"></iframe>

## Results

Now that I've analysed my mood clusters, I am going to try and define each mood! To do this I am going to summarize of the cluster's audio feature statistics, try to define a respresentative mood, and then look at a sample of the data for manual confirmation.

First, I scale all of my data features using the sklearn [Standard Scaler](http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html). The scaler will transform each audio feature value such that each audio feature has a mean of 0 and variance of 1 across all songs in the feature column. This will allow for a much clearer visualization of comparing features for each cluster.

I now visualize the feature differences using Seaborn's Heatmap Plot:

![Features](/Plots/featureheatmap.png "Logo Title Text 1")


### Cluster 0: HYPE mood

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

Cluster 1 is perhaps the most ambiguous mood cluster. Its audio features are:

- Very Low Tempo and Valence
- Low Instrumentalness and Acousticness
- Average Energy and Danceability

These songs are not particularly positive, but are not instrumental/acoustic sad songs either. The average energy and danceability makes me feel like the cluster's songs are catchy but a little more angsty and not quite as hype as Cluster 0.

These audio features point to the mood cluster contain a lot of **Moody Pop/R&B Songs**.
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
Cluster 2 was similar to Cluster 0 in loudness and energy, though specifically different in speechiness and danceability. Its audio features are:

- Very High Danceability and Valence
- High Loudness and Energy
- Low Instrumentalness

These songs are happy and exciting and make you want to dance. However, unline Cluster 0, the songs do not have a high speechiness. 

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

# Next Steps

Now that I have stratified my music into different moods, the next step would be to access the Spotify API and use the "Create Playlist" feature to create custom Spotify playlist based on mood.

# Next Next Steps 
Use that backend ML algorithim in a Web App that when given Spotify username and token access information, the app will run the K-Means Algorithim, create defined moods, and then build custom playlists for each mood for the user directly in the Spotify app.














