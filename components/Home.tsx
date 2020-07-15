import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const startIconUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/1235px-Red_star.svg.png';

type Movie = {
  title: string;
  art: string;
  duration?: string;
  category?: string;
  director?: string;
  rating?: string;
  reviews?: string;
};

const recentMovies: Array<Movie> = [
  {
    title: 'Dunkirk',
    art: 'https://miro.medium.com/max/3000/1*q_tbw34Yx7LhXbE0haQ9cA.jpeg',
  },
  {
    title: 'The Hateful Eight',
    art:
      'https://i.insider.com/5677edf0dd0895ae788b4735?width=1136&format=jpeg',
  },
  {
    title: 'The Revenant',
    art: 'https://images.alphacoders.com/676/thumb-1920-676781.png',
  },
];

const popularMovies: Array<Movie> = [
  {
    title: 'Interstellar',
    art:
      'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
    duration: '2h 30m',
    category: 'SF, Adventure',
    director: 'Cristopher Nolan',
    rating: '8.6',
    reviews: '349 reviews',
  },
  {
    title: 'Deadpool 2',
    art:
      'https://mypostercollection.com/wp-content/uploads/2018/04/Deadpool-2-Parody-Poster-2-John-Wick.jpg',
    duration: '1h 59min',
    category: 'Adventure, Action, Comedy',
    director: 'David Leitch',
    rating: '7.8',
    reviews: '189 reviews',
  },
];

export default () => {
  const navigation = useNavigation();
  function RecentMovie(movie: Movie) {
    return (
      <View key={movie.title}>
        <TouchableOpacity
          onPress={() => goToDetails(movie)}
          activeOpacity={0.8}>
          <Image
            source={{uri: movie.art}}
            resizeMode={'cover'}
            style={styles.recentImage}
          />
        </TouchableOpacity>
        <Text style={styles.recentMovieTitle}>{movie.title}</Text>
      </View>
    );
  }

  function PopularMovie(movie: Movie) {
    return (
      <View key={movie.title} style={styles.popularMovieContainer}>
        <TouchableOpacity
          onPress={() => goToDetails(movie)}
          activeOpacity={0.8}>
          <Image
            source={{uri: movie.art}}
            resizeMode={'cover'}
            style={styles.popularImage}
          />
        </TouchableOpacity>
        <View style={styles.popularMovieDetails}>
          <Text style={styles.popularMovieTitle}>{movie.title}</Text>
          <Text style={styles.popularMovieDuration}>{movie.duration}</Text>
          <Text style={styles.popularMovieCategory}>{movie.category}</Text>
          <Text style={styles.popularMovieDirector}>
            Director: {movie.director}
          </Text>
          <View style={styles.popularMovieRatingContainer}>
            <Image
              style={styles.popularMovieRatingIcon}
              source={{
                uri: startIconUrl,
              }}
            />
            <Text style={styles.popularMovieRating}>{movie.rating}</Text>
            <Text style={styles.popularMovieRatingMax}> / 10</Text>
          </View>
          <Text style={styles.popularMovieReviews}>{movie.reviews}</Text>
        </View>
      </View>
    );
  }

  function goToDetails(movie: Movie) {
    navigation.navigate('Details', {
      movie,
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.innerContainer}>
      <Text style={styles.searchText}>Search</Text>
      <TextInput
        style={styles.searchTextInputField}
        placeholderTextColor={'gray'}
        placeholder={'Movies, Actors, Directors...'}
      />
      <Text style={styles.recentText}>Recent</Text>
      <ScrollView
        style={styles.recentScrollContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {recentMovies.map((movie) => {
          return RecentMovie(movie);
        })}
      </ScrollView>
      <Text style={styles.popularText}>Popular</Text>
      {popularMovies.map((movie) => {
        return PopularMovie(movie);
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  innerContainer: {
    paddingBottom: 56,
  },
  searchText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
  },
  searchTextInputField: {
    color: 'white',
    fontSize: 22,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  recentText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 40,
  },
  recentScrollContainer: {
    marginTop: 20,
    maxHeight: 250,
  },
  recentImage: {
    height: 200,
    width: 150,
    borderRadius: 5,
    marginRight: 20,
  },
  recentMovieTitle: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    maxWidth: 100,
  },
  popularText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  popularImage: {
    height: 300,
    width: 200,
    marginTop: 20,
  },
  popularMovieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularMovieDetails: {
    marginStart: 20,
  },
  popularMovieTitle: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: '600',
  },
  popularMovieDuration: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },
  popularMovieCategory: {
    color: 'gray',
    marginTop: 10,
    maxWidth: 150,
    fontSize: 15,
  },
  popularMovieDirector: {
    color: 'gray',
    fontSize: 15,
  },
  popularMovieRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  popularMovieRatingIcon: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  popularMovieRating: {
    color: 'white',
    fontSize: 25,
  },
  popularMovieRatingMax: {
    color: 'white',
    fontSize: 15,
  },
  popularMovieReviews: {
    color: 'gray',
    marginTop: 10,
    fontSize: 12,
  },
});
