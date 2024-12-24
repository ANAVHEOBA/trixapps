import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';

export default function useFonts() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          ...AntDesign.font,
          ...Entypo.font,
          ...EvilIcons.font,
          ...Feather.font,
          ...FontAwesome.font,
          ...FontAwesome5.font,
          ...Fontisto.font,
          ...Foundation.font,
          ...Ionicons.font,
          ...MaterialCommunityIcons.font,
          ...MaterialIcons.font,
          ...Octicons.font,
          ...SimpleLineIcons.font,
          ...Zocial.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}