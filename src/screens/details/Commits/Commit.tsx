import type {FC} from 'react';
import type {components} from '@octokit/openapi-types';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    gap: 8.5,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 17,
    paddingVertical: 8.5,
  },
  body: {
    flex: 1,
    gap: 8.5,
  },
  hash: {
    color: 'gray',
  },
  boldText: {
    fontWeight: '600',
  },
  text: {
    fontWeight: 'normal',
    color: 'black',
    fontSize: 16,
  },
});

interface TCommit {
  commit: components['schemas']['commit'];
}

const Commit: FC<TCommit> = ({commit}) => {
  const label = commit.commit.message.split('\n')[0];
  const date = new Date(
    commit.commit.committer?.date ?? Date.now(),
  ).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <View>
        <Icon name="git-commit-outline" size={20} color={'gray'} />
      </View>
      <View style={styles.body}>
        <Text style={[styles.text, styles.boldText]}>{label}</Text>
        <Text style={styles.hash}>{commit.sha.substring(0, 8)}</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>{commit.author?.login}</Text> authored
          and <Text style={styles.boldText}>{commit.committer?.login}</Text>{' '}
          committed on <Text>{date}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Commit;
