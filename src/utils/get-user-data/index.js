import {useEffect} from 'react';
import {getData} from '../async-storage';

export const getUserData = (setData, initialState, callback) =>
  useEffect(() => {
    getData('user').then(res => {
      setData(res);
      if (callback) {
        callback();
      }
    });

    return () => {
      setData({
        ...initialState,
      });
    };
  }, []);
