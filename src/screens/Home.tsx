import {FC} from 'react';
import {View, FlatList} from 'react-native';
import {iOSColors, human} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

import {detailsScreen} from 'src/routes';
import Link from 'src/components/Link';

const styles = EStyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: '0.5rem',
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: 1,
    paddingHorizontal: '1rem',
    paddingVertical: '0.5rem',
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
      <Icon
        name="logo-github"
        color={iOSColors.black}
        size={human.bodyObject.fontSize}
      />
      <Link
        to={{screen: detailsScreen, params: {repo, owner}}}
        textStyle={human.body}>
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
