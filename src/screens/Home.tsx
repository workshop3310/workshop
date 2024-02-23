import {FC} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {detailsScreen} from 'src/routes';
import Link from 'src/components/Link';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 8.5,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 17,
    paddingVertical: 8.5,
  },
});

interface IRepo {
  owner: string;
  repo: string;
}
const REPOS: IRepo[] = [
  {owner: 'facebook', repo: 'react-native'},
  {owner: 'facebook', repo: 'react'},
  {owner: 'github', repo: 'rest-api-description'},
];

interface TItem {
  data: IRepo;
}
const Item: FC<TItem> = ({data}) => {
  const {repo, owner} = data;

  return (
    <View style={styles.itemContainer}>
      <Icon name="logo-github" color={'black'} size={16} />
      <Link to={{screen: detailsScreen, params: {repo, owner}}}>
        {owner}/{repo}
      </Link>
    </View>
  );
};

const HomeScreen: FC = () => {
  return (
    <FlatList
      data={REPOS}
      renderItem={({item}) => <Item data={item} />}
      keyExtractor={item => `${item.owner}/${item.repo}`}
    />
  );
};

export default HomeScreen;
