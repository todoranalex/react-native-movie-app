import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';
import {startIconUrl} from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

export default ({route, navigation}) => {
  const {movie} = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const translateInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
    extrapolate: 'clamp',
  });
  const opacityInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    function translate() {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        delay: 200,
        easing: Easing.linear,
      }).start();
    }
    translate();
  }, []);
  return (
    <ScrollView style={styles.scrollContainer}>
      <SharedElement id={`item.${movie.title}.photo`}>
        <FastImage
          resizeMode={'cover'}
          source={{uri: movie.art}}
          style={styles.topImage}
        />
      </SharedElement>
      <Animated.View
        style={[
          styles.topIcons,
          {
            opacity: opacityInterpolation,
          },
        ]}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="angle-left"
          color="white"
          size={24}
        />
        <Icon name="share-alt" color="white" size={18} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityInterpolation,
            transform: [
              {
                translateY: translateInterpolation,
              },
            ],
          },
        ]}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity disabled={true} style={styles.categoryButton}>
            <Text style={styles.categoryText}>ACTION</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.categoryButton}>
            <Text style={styles.categoryText}>DRAMA</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.categoryButton}>
            <Text style={styles.categoryText}>HISTORY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <View style={styles.metascoreContainer}>
            <Text style={styles.metascoreValue}>9.4</Text>
            <Text style={styles.metascoreLabel}>Metascore</Text>
          </View>
          <View style={styles.metascoreContainer}>
            <FastImage
              style={styles.ratingIcon}
              source={{
                uri: startIconUrl,
              }}
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingValue}>{movie.rating}</Text>
              <Text style={styles.ratingMaxValue}> / 10</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.synopsisLabel}>Synopsis</Text>
        <Text style={styles.synopsis}>
          In May 1940, Germany advanced into France, trapping Allied troops on
          the beaches of Dunkirk. Under air and ground cover from British and
          French forces, troops were slowly and methodically evacuated from the
          beach using every serviceable naval and civilian vessel that could be
          found. At the end of this heroic mission, 330,000 French, British,
          Belgian and Dutch soldiers were safely evacuated.
        </Text>
        <View style={styles.separator} />
        <Text style={styles.photogalleryLabel}>Photogallery</Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  scrollContainer: {flex: 1, backgroundColor: '#242424'},
  topImage: {
    height: height / 2,
    width,
  },
  topIcons: {
    position: 'absolute',
    top: 26,
    flexDirection: 'row',
    width,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignSelf: 'baseline',
    marginEnd: 10,
  },
  categoryText: {
    color: 'gray',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  separator: {
    marginVertical: 20,
    width: '100%',
    height: 1,
    opacity: 0.3,
    backgroundColor: 'gray',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  metascoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  metascoreLabel: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
  },
  metascoreValue: {
    color: 'green',
    fontSize: 20,
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    height: 20,
    width: 20,
  },
  ratingValue: {
    color: 'white',
    marginTop: 5,
    fontSize: 20,
  },
  ratingMaxValue: {
    color: 'white',
    marginTop: 5,
    fontSize: 15,
  },
  synopsisLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  synopsis: {
    marginTop: 20,
    color: 'gray',
    fontSize: 15,
  },
  photogalleryLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 20,
  },
});
