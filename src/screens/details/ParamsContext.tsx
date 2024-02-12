import {FC, ReactNode, createContext, useContext, useMemo} from 'react';

interface TDetailsParams {
  owner: string;
  repo: string;
}

const DetailsParamsContext = createContext<TDetailsParams>({
  owner: '',
  repo: '',
});

export default function useDetailsParams() {
  return useContext(DetailsParamsContext);
}

interface TProps extends TDetailsParams {
  children: ReactNode;
}

export const DetailsParamsProvider: FC<TProps> = props => {
  const {owner, repo, children} = props;

  const value = useMemo(() => ({owner, repo}), [owner, repo]);

  return (
    <DetailsParamsContext.Provider value={value}>
      {children}
    </DetailsParamsContext.Provider>
  );
};
