/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header/Header';
import Style from '../../Style/Style';
import TopHeader from '../../components/TopHeader/TopHeader';
const Videos = [
  {
    Videourl: '',
  },
];
const VideoScreen = props => {
  const [currentTime, SetcurrenTime] = useState('0');
  const [isFullScreen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType] = useState('content');
  const onProgress = data => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      SetcurrenTime({currentTime: data.currentTime});
    }
  };
  const onLoad = data =>
    setLoading({duration: data.duration, isLoading: false});
  const onLoadStart = () => setLoading({isLoading: true});
  const onEnd = () => setPlayerState({playerState: PLAYER_STATES.ENDED});

  return (
    <View style={Style.topcontainer}>
      <TopHeader />
      <Header name={'VIDEO'} {...props} />
      <KeyboardAwareScrollView>
        <FlatList
          data={Videos}
          style={Style.flatlist}
          renderItem={({item}) => (
            <Video
              source={item.Videourl}
              allowsExternalPlayback={true}
              rate={0.0}
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onProgress={onProgress}
              resizeMode={screenType}
              onFullScreen={isFullScreen}
              style={Style.mediaView}
              volume={2}
              controls={true}
              filterEnable={true}
              fullscreen={true}
              paused={true}
              muted={true}
              disableFocus={true}
            />
          )}
          keyExtractor={item => item.id}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default VideoScreen;
