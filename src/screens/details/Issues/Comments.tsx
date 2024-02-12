import type {FC} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {human, iOSColors} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: '0.25rem',
  },
});

interface TComments {
  comments: number;
}

const Comments: FC<TComments> = ({comments}) => {
  if (!comments) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Icon
        name="chatbox-outline"
        size={human.bodyObject.fontSize}
        color={iOSColors.black}
      />

      <Text style={human.body}>{comments}</Text>
    </View>
  );
};

export default Comments;
