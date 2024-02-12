import type {FC} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iOSColors, human} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    backgroundColor: '#fdeded',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.25rem',
  },
  text: {
    ...human.bodyObject,
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
        <Icon
          name="alert-circle-outline"
          color={iOSColors.red}
          size={styles._text.fontSize}
        />
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

export default Error;
