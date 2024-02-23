import type {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlignVertical: 'top',
    gap: 4.25,
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
      <Icon name="chatbox-outline" size={18} color={'black'} />
      <Text>{comments}</Text>
    </View>
  );
};

export default Comments;
