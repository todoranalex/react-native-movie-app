import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import FastImage from 'react-native-fast-image';

export const startIconUrl =
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

const recent: Array<Movie> = [
  {
    title: 'Dunkirk',
    art:
      'https://i.pinimg.com/564x/44/a3/1e/44a31ea42f108a9ec2446affc5674959.jpg',
    rating: '8.1',
    director: 'Cristopher Nolan',
  },
  {
    title: 'The Hateful Eight',
    art:
      'https://fsa.zobj.net/crop.php?r=6kRC61-FvSZpsxRYuHUHCsVQhHSMPjUOZjQFDUwOYl3E_X49RE4GCSM00H9HSiqOiaqSsONiVcCvNF4Xuij_stHa4ptFmD8HHpUkPCHSFb2eofFs8kbA0I6__9jO-SQ6Nh9Kk8VknNtilqqkQ4Ypn59J65156iNmazxOpGb191EZwl9-05YFqKQSV-c',
  },
  {
    title: 'The Revenant',
    art:
      'https://c4.wallpaperflare.com/wallpaper/911/119/749/movie-the-revenant-leonardo-dicaprio-wallpaper-preview.jpg',
  },
  {
    title: 'Inception',
    art:
      'https://wallup.net/wp-content/uploads/2016/05/27/72069-Inception-748x468.jpg',
  },
  {
    title: 'Knives Out',
    art:
      'https://i1.wp.com/www.comicsbeat.com/wp-content/uploads/2019/09/KnivesOutCharacterposters.jpg?fit=1200%2C551&ssl=1',
  },
];

const popular: Array<Movie> = [
  {
    title: 'Interstellar',
    art:
      'https://wallup.net/wp-content/uploads/2016/08/08/122323-Interstellar_movie.jpg',
    duration: '2h 30m',
    category: 'SF, Adventure',
    director: 'Cristopher Nolan',
    rating: '8.6',
    reviews: '349 reviews',
  },
  {
    title: 'Deadpool 2',
    art:
      'https://wallup.net/wp-content/uploads/2016/02/235813-Deadpool-movies-748x499.jpg',
    duration: '1h 59min',
    category: 'Adventure, Action, Comedy',
    director: 'David Leitch',
    rating: '7.8',
    reviews: '189 reviews',
  },
  {
    title: 'Prometheus',
    art: 'https://cdn.hipwallpaper.com/i/75/26/dpvaP0.jpg',
    duration: '2h 4min',
    category: 'Adventure, Thriller, Sci-Fi',
    director: 'Ridley Scott',
    rating: '7.0',
    reviews: '230 reviews',
  },
];

export default () => {
  const navigation = useNavigation();
  const [recentMovies, setRecentMovies] = useState(recent);
  const [popularMovies, setPopularMovies] = useState(popular);
  function RecentMovie(movie: Movie) {
    return (
      <View key={movie.title}>
        <TouchableScale
          onPress={() => goToDetails(movie)}
          activeScale={0.9}
          friction={7}
          useNativeDriver>
          <SharedElement id={`item.${movie.title}.photo`}>
            <FastImage
              source={{uri: movie.art}}
              resizeMode={'cover'}
              style={styles.recentImage}
            />
          </SharedElement>
        </TouchableScale>
        <SharedElement id={`item.${movie.title}.title`}>
          <Text style={styles.recentMovieTitle}>{movie.title}</Text>
        </SharedElement>
      </View>
    );
  }

  function PopularMovie(movie: Movie) {
    return (
      <View key={movie.title} style={styles.popularMovieContainer}>
        <TouchableScale
          onPress={() => goToDetails(movie)}
          activeScale={0.9}
          friction={7}
          useNativeDriver>
          <SharedElement id={`item.${movie.title}.photo`}>
            <FastImage
              source={{uri: movie.art}}
              resizeMode={'cover'}
              style={styles.popularImage}
            />
          </SharedElement>
        </TouchableScale>
        <View style={styles.popularMovieDetails}>
          <Text style={styles.popularMovieTitle}>{movie.title}</Text>
          <Text style={styles.popularMovieDuration}>{movie.duration}</Text>
          <Text style={styles.popularMovieCategory}>{movie.category}</Text>
          <Text style={styles.popularMovieDirector}>
            Director: {movie.director}
          </Text>
          <View style={styles.popularMovieRatingContainer}>
            <FastImage
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

  function search(keyword: string): void {
    const filteredRecent = recentMovies.filter((movie) => {
      return movie.title.includes(keyword) || movie.director?.includes(keyword);
    });
    const filteredPopular = popularMovies.filter((movie) => {
      return movie.title.includes(keyword) || movie.director?.includes(keyword);
    });
    setRecentMovies(filteredRecent);
    setPopularMovies(filteredPopular);
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
        onChangeText={(value) => {
          if (value.length > 0) {
            search(value);
          } else {
            setRecentMovies(recent);
            setPopularMovies(popular);
          }
        }}
      />
      <View style={styles.recentContainer}>
        <Text style={styles.recentText}>Recent</Text>
        <Text style={styles.recentSeeAll}>SEE ALL</Text>
      </View>
      <ScrollView
        style={styles.recentScrollContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {recentMovies.map((movie) => {
          return RecentMovie(movie);
        })}
      </ScrollView>
      <View style={styles.recentContainer}>
        <Text style={styles.popularText}>Popular</Text>
        <Text style={styles.recentSeeAll}>SEE ALL</Text>
      </View>
      {popularMovies.map((movie) => {
        return PopularMovie(movie);
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  innerContainer: {
    paddingBottom: 56 + 20,
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
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignItems: 'center',
  },
  recentText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  recentSeeAll: {
    color: 'gray',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  recentScrollContainer: {
    marginTop: 20,
    maxHeight: 260,
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
  },
  popularImage: {
    height: 250,
    width: 150,
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
    fontSize: 12,
  },
  popularMovieDirector: {
    color: 'gray',
    fontSize: 12,
  },
  popularMovieRatingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  popularMovieRatingIcon: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  popularMovieRating: {
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 20,
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
