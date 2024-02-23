import type {FC} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TState {
  state: string;
}
const State: FC<TState> = ({state}) => {
  const [statusIcon, statuscolor] =
    state === 'open'
      ? ['disc-outline', 'green']
      : ['checkmark-circle-outline', 'purple'];

  return (
    <View>
      <Icon name={statusIcon} size={16} color={statuscolor} />
    </View>
  );
};

export default State;
