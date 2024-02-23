import type {FC} from 'react';
import type {components} from '@octokit/openapi-types';
import {View, Text, StyleSheet} from 'react-native';

import State from './State';
import Comments from './Comments';

const styles = StyleSheet.create({
  container: {
    gap: 8.5,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 17,
    paddingVertical: 8.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  issueBody: {
    flex: 1,
    gap: 8.5,
  },
  footNote: {
    color: 'gray',
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
        <Text style={styles.title}>{issue.title}</Text>
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
