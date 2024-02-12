import type {FC} from 'react';
import {human, iOSColors} from 'react-native-typography';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TState {
  state: string;
}
const State: FC<TState> = ({state}) => {
  const [statusIcon, statuscolor] =
    state === 'open'
      ? ['disc-outline', iOSColors.green]
      : ['checkmark-circle-outline', iOSColors.purple];

  return (
    <View>
      <Icon
        name={statusIcon}
        size={human.bodyObject.fontSize}
        color={statuscolor}
      />
    </View>
  );
};

export default State;
