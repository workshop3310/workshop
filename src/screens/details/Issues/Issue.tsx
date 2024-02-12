import type {FC} from 'react';
import type {components} from '@octokit/openapi-types';
import {View, Text} from 'react-native';
import {human, iOSColors} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

import State from './State';
import Comments from './Comments';
import Labels from './Labels';

const styles = EStyleSheet.create({
  container: {
    gap: '0.5rem',
    flexDirection: 'row',
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: 1,
    paddingHorizontal: '1rem',
    paddingVertical: '0.5rem',
  },
  issueBody: {
    flex: 1,
    gap: '0.5rem',
  },
  footNote: {
    ...human.footnoteObject,
    color: iOSColors.gray,
  },
});

interface TIssue {
  issue: components['schemas']['issue'];
}

const Issue: FC<TIssue> = ({issue}) => {
  const date = new Date(issue.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <State state={issue.state} />
      <View style={styles.issueBody}>
        <Text style={human.title3}>{issue.title}</Text>
        <Labels labels={issue.labels} />
        <Text style={styles.footNote}>
          #{issue.number} opened on {date}
          {issue.user ? ` by ${issue.user.login}` : ''}
        </Text>
      </View>
      <Comments comments={issue.comments} />
    </View>
  );
};

export default Issue;
