import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {color, fonts} from '../../../utils';

const InputChat = ({onChange, onFocus, value, ref}) => {
  const [h, setHeight] = useState(47.5);

  useEffect(() => {
    if (value.length === 0) {
      setHeight(47.5);
    }
  }, [value]);

  const handleContentSize = e => {
    const {height} = e.nativeEvent.contentSize;
    if (value.length > 0) {
      if (height < 90) {
        setHeight(height);
      } else if (height > 105) {
        setHeight(88.5);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        placeholderTextColor={color.inputChat.placeholder}
        placeholder="Tulis Pesan"
        style={styles.input(h)}
        onChangeText={onChange}
        onFocus={onFocus}
        value={value}
        multiline
        numberOfLines={2}
        onContentSizeChange={handleContentSize}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  input: h => ({
    backgroundColor: color.inputChat.background,
    borderRadius: 10,
    padding: 14,
    fontFamily: fonts.primary[400],
    marginRight: 10,
    color: color.text.primary,
    height: h,
    maxHeight: 85.5,
  }),
  container: {
    flex: 1,
  },
});
