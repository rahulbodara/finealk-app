import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: '100%',
    shadowColor: '#fcfcfc',
    shadowOpacity: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
  },

  leftbullets: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: 'white',
    borderRadius : 30,
    padding : 5
  },

  rightbullets :{
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'white',
    borderRadius : 30,
    padding : 5
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
});

export default styles;
