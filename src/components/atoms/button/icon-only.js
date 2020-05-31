import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconArrowBlack, IconArrowWhite} from '../../../assets';

const IconOnly = ({icon, onPress}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconArrowBlack />;
    }

    if (icon === 'back-light') {
      return <IconArrowWhite />;
    }

    return <IconArrowBlack />;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
