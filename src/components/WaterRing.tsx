import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = { percent: number }; // 0–100

const SIZE = 250;
const STROKE = 40;
const R = (SIZE - STROKE) / 2;   // radius, minus stroke so it doesn't clip
const CENTER = SIZE / 2;

export function WaterRing({ percent }: Props) {
  const circumference = 2 * Math.PI * R; 
  const dashoffset = circumference * (1 - percent / 100);   

  return (
    <View style={styles.wrap}>
      <Svg width={SIZE} height={SIZE}>
        <Circle cx={CENTER} cy={CENTER} r={R} stroke="#e3eefc" strokeWidth={STROKE} fill="none" />
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          stroke="#2f80ed"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${CENTER} ${CENTER})`}  // start fill at 12 o'clock
        />
      </Svg>
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{percent}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
  labelWrap: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 36, fontWeight: 'bold' },
});