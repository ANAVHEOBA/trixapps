import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          AntDesign: require('@expo/vector-icons/fonts/AntDesign.ttf'),
          Entypo: require('@expo/vector-icons/fonts/Entypo.ttf'),
          EvilIcons: require('@expo/vector-icons/fonts/EvilIcons.ttf'),
          Feather: require('@expo/vector-icons/fonts/Feather.ttf'),
          FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf'),
          'FontAwesome5_Brands': require('@expo/vector-icons/fonts/FontAwesome5_Brands.ttf'),
          'FontAwesome5_Regular': require('@expo/vector-icons/fonts/FontAwesome5_Regular.ttf'),
          'FontAwesome5_Solid': require('@expo/vector-icons/fonts/FontAwesome5_Solid.ttf'),
          Fontisto: require('@expo/vector-icons/fonts/Fontisto.ttf'),
          Foundation: require('@expo/vector-icons/fonts/Foundation.ttf'),
          Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
          MaterialCommunityIcons: require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
          MaterialIcons: require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
          Octicons: require('@expo/vector-icons/fonts/Octicons.ttf'),
          SimpleLineIcons: require('@expo/vector-icons/fonts/SimpleLineIcons.ttf'),
          Zocial: require('@expo/vector-icons/fonts/Zocial.ttf'),
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