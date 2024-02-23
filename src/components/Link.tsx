import {FC, ReactNode} from 'react';
import {useLinkProps} from '@react-navigation/native';
import type {To} from '@react-navigation/native/lib/typescript/src/useLinkTo';
import {
  TouchableOpacity,
  Text,
  ViewProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native';

interface TProps extends ViewProps {
  to: To<ReactNavigation.RootParamList, keyof ReactNavigation.RootParamList>;
  children: ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    color: 'black',
    fontSize: 14,
  },
});

const LinkButton: FC<TProps> = ({to, children, textStyle, ...rest}) => {
  const {onPress} = useLinkProps({to});

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
