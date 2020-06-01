import {useEffect} from 'react';
import {getData} from '../async-storage';

export const getUserData = (setData, initialState) =>
  useEffect(() => {
    getData('user').then(res => {
      setData(res);
    });

    return () => {
      setData({
        ...initialState,
      });
    };
  }, []);
