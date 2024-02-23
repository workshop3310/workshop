import {FC} from 'react';
import {FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import client from 'src/client';
import Error from 'src/components/Error/Error';
import Loading from 'src/components/Loading/Loading';

import useDetailsParams from '../ParamsContext';
import Commit from './Commit';

interface TQContext {
  queryKey: ['commits', {owner: string; repo: string}];
}

async function getCommits({queryKey}: TQContext) {
  const [, {owner, repo}] = queryKey;
  const resp = await client.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return resp.data;
}

const Commits: FC = () => {
  const {owner, repo} = useDetailsParams();
  const query = useQuery(['commits', {owner, repo}], getCommits);

  if (query.status === 'error') {
    return <Error>Cannot fetch data</Error>;
  }

  if (query.status !== 'success') {
    return <Loading />;
  }

  return (
    <FlatList
      data={query.data}
      renderItem={({item}) => <Commit commit={item} />}
      keyExtractor={commit => commit.sha}
    />
  );
};

export default Commits;
