import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../screens/Homescreen';

import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homescreen} options={{ title: 'Home' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;