import {FC} from 'react';
import {FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import Error from 'src/components/Error/Error';
import Loading from 'src/components/Loading/Loading';
import client from 'src/client';
import useDetailsParams from '../ParamsContext';

import Issue from './Issue';

interface TQContext {
  queryKey: ['issues', {owner: string; repo: string}];
}

async function getIssues({queryKey}: TQContext) {
  const [, {owner, repo}] = queryKey;
  const resp = await client.request(
    'GET /repos/{owner}/{repo}/issues?state=all',
    {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  return resp.data;
}

const Issues: FC = () => {
  const {owner, repo} = useDetailsParams();
  const query = useQuery(['issues', {owner, repo}], getIssues);

  if (query.status === 'error') {
    return <Error>Cannot fetch data</Error>;
  }

  if (query.status !== 'success') {
    return <Loading />;
  }

  return (
    <FlatList
      data={query.data}
      renderItem={({item}) => <Issue issue={item} />}
      keyExtractor={issue => String(issue.number)}
    />
  );
};

export default Issues;
