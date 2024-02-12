import type {FC, ReactNode} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {human, iOSColors} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  row: {
    gap: '0.25rem',
    flexDirection: 'row',
  },
  label: {
    ...human.bodyObject,
    color: iOSColors.gray,
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
      <Icon
        name={icon}
        size={human.bodyObject.fontSize}
        color={iOSColors.black}
      />
      <Text style={human.body}>{children}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Property;
