import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';;
import Feather from 'react-native-vector-icons/Feather';
import { Badge, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView } from 'react-native-safe-area-context';

const IconSize = 24;

const AppHeader = ({
  style,
  menu,
  back,
  title,
  right,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  headerBg,
  iconColor,
  titleAlight,
  optionalBadge,
}) => {
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 100],
    extrapolate: 'clamp',
  });

  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={() => {}}>
          <Feather name="arrow-left" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );

  const RightView = () => (
    rightComponent ? (
      rightComponent()
    ) : (
      <View style={[styles.view, styles.rightView]}>
        {optionalBtn && (
          <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
            <Feather name={optionalBtn} size={IconSize} color={iconColor} />
            {optionalBadge && <Badge style={{ position: 'absolute', top: -5, right: -10 }}>{optionalBadge}</Badge>}
          </TouchableOpacity>
        )}
        {right && (
          <TouchableOpacity onPress={onRightPress}>
            <Feather name={right} size={IconSize} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    )
  );

  const TitleView = () => (
    <View style={styles.titleView}>
      <Title style={{ color: iconColor, textAlign: titleAlight }}>{title}</Title>
    </View>
  );

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Make sure to set useNativeDriver to false
  )}
  scrollEventThrottle={16} // Adjust the throttle as needed
>
    <Animated.View style={[styles.header, style, { height: headerHeight, backgroundColor: 'transparent' }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />
      <LeftView />
      <TitleView />
      <RightView />
    </Animated.View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: getStatusBarHeight() + 10,
    paddingHorizontal: 16,
  },
  gradient: {
    flex: 1,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  
  },
});

export default AppHeader;
