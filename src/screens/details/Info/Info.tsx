import {FC} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {human, iOSColors} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

import client from 'src/client';
import Error from 'src/components/Error/Error';
import Loading from 'src/components/Loading/Loading';

import useDetailsParams from '../ParamsContext';
import Property from './Property';

const styles = EStyleSheet.create({
  container: {
    gap: '0.5rem',
    paddingHorizontal: '0.5rem',
  },
  description: {
    borderLeftColor: iOSColors.midGray,
    borderLeftWidth: 1,
    paddingLeft: '0.25rem',
  },
  descriptionText: {
    ...human.title3Object,
    color: iOSColors.gray,
  },
});

interface TQContext {
  queryKey: ['info', {owner: string; repo: string}];
}

async function getInfo({queryKey}: TQContext) {
  const [, {owner, repo}] = queryKey;
  const resp = await client.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return resp.data;
}

const Info: FC = () => {
  const {owner, repo} = useDetailsParams();
  const query = useQuery(['info', {owner, repo}], getInfo);

  if (query.status === 'error') {
    return <Error>Cannot fetch data</Error>;
  }

  if (query.status !== 'success') {
    return <Loading />;
  }
  const {data} = query;

  const date = new Date(data.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={human.title1}>{data.name}</Text>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{data.description}</Text>
      </View>
      <Property icon="time-outline">{date}</Property>
      {!!data.license && (
        <Property icon="information-circle-outline">
          {data.license.name}
        </Property>
      )}
      <Property icon="git-network-outline" label="forks">
        {data.forks}
      </Property>
      <Property icon="disc-outline" label="issues">
        {data.open_issues}
      </Property>
      <Property icon="star-outline" label="stars">
        {data.watchers}
      </Property>
    </View>
  );
};

export default Info;
