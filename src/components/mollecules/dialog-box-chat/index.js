import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {color} from '../../../utils';

const DialogBoxChat = ({onCopy, onClose}) => {
  const [state, setState] = useState({
    height: 0,
    width: 0,
  });
  const [trick, setTrick] = useState(0);

  const getLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setState({
      height,
      width,
    });
    setTrick(1);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onCopy}>
        <View
          onLayout={getLayout}
          style={[
            styles.dialogBox(trick),
            {
              transform: [
                {translateY: -(state.height / 2)},
                {translateX: -(state.width / 2)},
              ],
            },
          ]}>
          <Text>Copy Text</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default DialogBoxChat;

const styles = StyleSheet.create({
  dialogBox: trick => {
    return {
      backgroundColor: color.white,
      width: '80%',
      height: 40,
      justifyContent: 'center',
      padding: 16,
      borderRadius: 10,
      position: 'absolute',
      zIndex: 200,
      top: '50%',
      left: '50%',
      opacity: trick,
    };
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.35)',
    position: 'absolute',
  },
});
