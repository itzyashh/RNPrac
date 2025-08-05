import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScrollingHeader = () => {
  const ChannelItem = ({ icon, title, subtitle, isActive = false }: { icon: string; title: string; subtitle?: string; isActive?: boolean }) => (
    <TouchableOpacity style={[styles.channelItem, isActive && styles.activeChannel]}>
      <View style={styles.channelIcon}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.channelContent}>
        <Text style={[styles.channelTitle, isActive && styles.activeChannelTitle]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.channelSubtitle}>{subtitle}</Text>
        )}
      </View>
      <View style={styles.channelArrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const initialHeight = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    if (initialHeight.value === 0) return {}; // wait until measured

    const height = interpolate(
      scrollY.value,
      [0, 100], // scroll distance
      [initialHeight.value, initialHeight.value / 2], // height range: full to half
      Extrapolation.CLAMP
    );
  
    return {
      height: withSpring(height, {
        damping: 100,
        stiffness: 1000,
        mass: 1,
      }),
    };
  });

  const rInnerStyle = useAnimatedStyle(() => {
    return {
        transform: [{
            scale: interpolate(scrollY.value, [0, 80], [1, 0.5], Extrapolation.CLAMP),
        }],
        opacity: interpolate(scrollY.value, [0, 80], [1, 0], Extrapolation.CLAMP),
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollY.value, [0, 80], [0, -140], Extrapolation.CLAMP);
    return {
        transform: [{
            translateX: withTiming(translateX, {
                duration: 400,
            }),
        }],
    };
  });

  const rNameStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 80], [0, 1], Extrapolation.CLAMP);
    const scale = interpolate(scrollY.value, [0, 80], [0.1, 1.2], Extrapolation.CLAMP);
    return {
      opacity: withTiming(opacity, {
        duration: 400,
      }),
      transform: [
        {
          scale: withTiming(scale, {
            duration: 400,
          }),
        },
      ],
    };
  });

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
            scrollY.value = event.contentOffset.y;

        // scale.value = interpolate(event.contentOffset.y, [0, 100], [1, 0], Extrapolation.CLAMP);
        // translateY.value = withSpring(event.contentOffset.y);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#01295F" />
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.View
        style={[styles.profileSection, rStyle]}
        onLayout={(event) => {
          initialHeight.value = event.nativeEvent.layout.height;
        }}
      >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Animated.View style={[styles.profileImage, rImageStyle]}>
                      <Text style={styles.profileImageText}>NG</Text>
                  </Animated.View>
                  <Animated.View style={[{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', opacity: 0}, rNameStyle]}>
                    <Text style={styles.profileName}>Nox Gaming</Text>
                  </Animated.View>
              </View>

          
          <Animated.View style={rInnerStyle}>
          <Animated.View style={[styles.profileInfo]}>
            <Text style={styles.profileName}>Nox Gaming</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3.2k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>152</Text>
                <Text style={styles.statLabel}>Followings</Text>
              </View>
            </View>
          </Animated.View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        </Animated.View>

      {/* Simple ScrollView */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {/* Profile Section */}


        {/* Dashboard Block */}
        <View style={styles.dashboardBlock}>
          <View style={styles.dashboardContent}>
            <View style={styles.dashboardIcon}>
              <Text style={styles.dashboardIconText}>📊</Text>
            </View>
            <View style={styles.dashboardText}>
              <Text style={styles.dashboardTitle}>Dashboard</Text>
              <Text style={styles.dashboardSubtitle}>Create, Manage, Monetize, more.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.dashboardArrow}>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Channels Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Channels</Text>
          
          <ChannelItem 
            icon="🎫" 
            title="Events" 
            subtitle="4 Active" 
            isActive={true}
          />
          
          <ChannelItem 
            icon="🏪" 
            title="Market Place" 
          />
          
          <ChannelItem 
            icon="💰" 
            title="Wallet" 
          />
          
          <ChannelItem 
            icon="⚔️" 
            title="Scrims" 
          />
          
          <ChannelItem 
            icon="🎮" 
            title="# Voice Channels" 
            subtitle="3 channels active" 
          />

          <ChannelItem 
            icon="👥" 
            title="Admin Team" 
          />

          <ChannelItem 
            icon="📢" 
            title="Advertisement" 
          />

          <ChannelItem 
            icon="🤝" 
            title="Sponsorships" 
          />

          <ChannelItem 
            icon="💳" 
            title="Subscription Plan" 
          />

          <ChannelItem 
            icon="❓" 
            title="Help & Support" 
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#01295F',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#01295F',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EE5820',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileImageText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    color: '#557094',
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E6EAEF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EE5820',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EE5820',
    backgroundColor: 'transparent',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#EE5820',
    fontSize: 14,
    fontWeight: '600',
  },
  dashboardBlock: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dashboardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dashboardIconText: {
    fontSize: 20,
  },
  dashboardText: {
    flex: 1,
  },
  dashboardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#01295F',
    marginBottom: 2,
  },
  dashboardSubtitle: {
    fontSize: 12,
    color: '#557094',
    fontWeight: '500',
  },
  dashboardArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01295F',
    marginBottom: 16,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6EAEF',
    marginBottom: 8,
  },
  activeChannel: {
    backgroundColor: '#F8F9FA',
    borderColor: '#EE5820',
  },
  channelIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
  },
  channelContent: {
    flex: 1,
  },
  channelTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#01295F',
  },
  activeChannelTitle: {
    color: '#EE5820',
  },
  channelSubtitle: {
    fontSize: 12,
    color: '#557094',
    fontWeight: '500',
    marginTop: 2,
  },
  channelArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: '#01295F',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default ScrollingHeader;