import type {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    backgroundColor: '#fdeded',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
    padding: 8.5,
    borderRadius: 4.25,
  },
  text: {
    color: '#5f2120',
  },
});

interface TProps {
  children: string;
}

const Error: FC<TProps> = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Icon name="alert-circle-outline" color={'red'} size={16} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

export default Error;
