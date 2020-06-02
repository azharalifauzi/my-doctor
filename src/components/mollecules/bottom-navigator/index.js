import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../../../utils';
import {TabItem} from '../../atoms';

const BottomNavigator = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={label}
            label={label}
            active={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
          // <TouchableOpacity
          //   accessibilityRole="button"
          //   accessibilityStates={isFocused ? ['selected'] : []}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   style={{flex: 1}}>
          //   <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          // </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.secondary,
    paddingVertical: 12,
    paddingHorizontal: 53,
    alignItems: 'center',
  },
});
