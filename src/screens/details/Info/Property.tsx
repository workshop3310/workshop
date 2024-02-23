import type {FC, ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  row: {
    gap: 4.25,
    flexDirection: 'row',
  },
  label: {
    color: 'gray',
  },
  text: {
    color: 'black',
    fontWeight: '500',
  },
});

interface TProperty {
  children: ReactNode;
  label?: string;
  icon: string;
}

const Property: FC<TProperty> = ({icon, label, children}) => {
  return (
    <View style={styles.row}>
      <Icon name={icon} size={18} color={'black'} />
      <Text style={styles.text}>{children}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Property;
