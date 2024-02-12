import {FC, ReactNode, useState} from 'react';
import {useLinkProps} from '@react-navigation/native';
import type {NavigationAction} from '@react-navigation/core';
import type {To} from '@react-navigation/native/lib/typescript/src/useLinkTo';
import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  ViewProps,
  StyleProp,
  TextStyle,
} from 'react-native';

interface TProps extends ViewProps {
  to: To<ReactNavigation.RootParamList, keyof ReactNavigation.RootParamList>;
  action?: NavigationAction;
  children: ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const LinkButton: FC<TProps> = ({to, action, children, textStyle, ...rest}) => {
  const {onPress, ...props} = useLinkProps({to, action});
  const [isHovered, setIsHovered] = useState(false);

  const viewStyle = {transitionDuration: '150ms', opacity: isHovered ? 0.5 : 1};

  if (Platform.OS === 'web') {
    return (
      <View
        // @ts-ignore-error it's a web
        onClick={onPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={viewStyle}
        {...props}
        {...rest}>
        <Text style={textStyle}>{children}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
