import type {FC} from 'react';
import type {components} from '@octokit/openapi-types';
import {Text, View} from 'react-native';
import {human, iOSColors, systemWeights} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    gap: '0.5rem',
    flexDirection: 'row',
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: 1,
    paddingHorizontal: '1rem',
    paddingVertical: '0.5rem',
  },
  body: {
    flex: 1,
    gap: '0.5rem',
  },
  hash: {
    ...human.footnoteObject,
    color: iOSColors.gray,
  },
  text: {
    ...human.bodyObject,
    ...systemWeights.light,
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
        <Icon
          name="git-commit-outline"
          size={human.bodyObject.fontSize}
          color={iOSColors.gray}
        />
      </View>
      <View style={styles.body}>
        <Text style={human.headline}>{label}</Text>
        <Text style={styles.hash}>{commit.sha.substring(0, 8)}</Text>
        <Text style={styles.text}>
          <Text style={systemWeights.semibold}>{commit.author?.login}</Text>{' '}
          authored and{' '}
          <Text style={systemWeights.semibold}>{commit.committer?.login}</Text>{' '}
          committed on <Text>{date}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Commit;
