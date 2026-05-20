import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  accountAvatarBrownColor,
  actionBrownColor,
  actionOrangeColor,
  balanceBadgeTextColor,
  greenColor,
  primaryColor,
  whiteColor,
} from '../constants/Color';
import { spacings } from '../constants/Fonts';

export const SUCCESS_ICON_SIZE = 72;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PARTICLE_COUNT = 32;

const STONE_COLORS = [
  primaryColor,
  actionBrownColor,
  balanceBadgeTextColor,
  actionOrangeColor,
  accountAvatarBrownColor,
  '#C4A484',
  '#B88968',
  '#D4A574',
];

const createParticles = () =>
  Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const isWide = index % 3 === 0;
    return {
      id: `stone-${index}`,
      left: Math.random() * (SCREEN_WIDTH - 36),
      width: isWide ? 18 + Math.random() * 14 : 10 + Math.random() * 10,
      height: isWide ? 8 + Math.random() * 8 : 12 + Math.random() * 14,
      color: STONE_COLORS[index % STONE_COLORS.length],
      delay: Math.random() * 480,
      duration: 1000 + Math.random() * 1100,
      rotateEnd: (Math.random() > 0.5 ? 1 : -1) * (160 + Math.random() * 300),
      startY: -(50 + Math.random() * 140),
      fallDistance: SCREEN_HEIGHT * 0.5 + Math.random() * SCREEN_HEIGHT * 0.25,
    };
  });

const FallingStoneParticle = ({ particle }) => {
  const translateY = useRef(new Animated.Value(particle.startY)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 120,
        delay: particle.delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: particle.fallDistance,
        duration: particle.duration,
        delay: particle.delay,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: particle.rotateEnd,
        duration: particle.duration,
        delay: particle.delay,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }, [opacity, particle, rotate, translateY]);

  const spin = rotate.interpolate({
    inputRange: [-720, 720],
    outputRange: ['-720deg', '720deg'],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: particle.left,
          width: particle.width,
          height: particle.height,
          backgroundColor: particle.color,
          opacity,
          transform: [{ translateY }, { rotate: spin }],
        },
      ]}
    />
  );
};

export const FallingStoneConfetti = ({ active = true }) => {
  const particles = useMemo(() => createParticles(), []);

  if (!active) {
    return null;
  }

  return (
    <View style={styles.confettiLayer} pointerEvents="none">
      {particles.map(particle => (
        <FallingStoneParticle key={particle.id} particle={particle} />
      ))}
    </View>
  );
};

export const AnimatedSuccessCheck = ({ active = true }) => {
  const iconDropY = useRef(new Animated.Value(-200)).current;
  const circleScale = useRef(new Animated.Value(0.15)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(0.55)).current;
  const pulseOpacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!active) {
      return;
    }

    iconDropY.setValue(-200);
    circleScale.setValue(0.15);
    circleOpacity.setValue(0);
    checkScale.setValue(0);

    const runPulse = () => {
      pulseScale.setValue(0.55);
      pulseOpacity.setValue(0.5);
      Animated.parallel([
        Animated.timing(pulseScale, {
          toValue: 2,
          duration: 680,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseOpacity, {
          toValue: 0,
          duration: 680,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    };

    Animated.sequence([
      Animated.parallel([
        Animated.spring(iconDropY, {
          toValue: 0,
          friction: 6,
          tension: 52,
          useNativeDriver: true,
        }),
        Animated.spring(circleScale, {
          toValue: 1,
          friction: 5,
          tension: 68,
          useNativeDriver: true,
        }),
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(checkScale, {
        toValue: 1,
        friction: 4,
        tension: 125,
        useNativeDriver: true,
      }),
    ]).start(() => {
      runPulse();
      setTimeout(runPulse, 420);
    });
  }, [active, checkScale, circleOpacity, circleScale, iconDropY, pulseOpacity, pulseScale]);

  return (
    <View style={styles.iconContainer}>
      <Animated.View
        style={[
          styles.pulseRing,
          {
            opacity: pulseOpacity,
            transform: [{ scale: pulseScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.iconWrap,
          {
            opacity: circleOpacity,
            transform: [{ translateY: iconDropY }, { scale: circleScale }],
          },
        ]}>
        <Animated.View style={{ transform: [{ scale: checkScale }] }}>
          <Icon name="check" size={40} color={whiteColor} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  confettiLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    top: 0,
    borderRadius: 4,
  },
  iconContainer: {
    width: SUCCESS_ICON_SIZE,
    height: SUCCESS_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacings.large,
  },
  pulseRing: {
    position: 'absolute',
    width: SUCCESS_ICON_SIZE,
    height: SUCCESS_ICON_SIZE,
    borderRadius: SUCCESS_ICON_SIZE / 2,
    backgroundColor: greenColor,
  },
  iconWrap: {
    width: SUCCESS_ICON_SIZE,
    height: SUCCESS_ICON_SIZE,
    borderRadius: SUCCESS_ICON_SIZE / 2,
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
