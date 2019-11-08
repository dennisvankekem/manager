import * as React from 'react';
import {
  matchPath,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import AppBar from 'src/components/core/AppBar';
import { makeStyles, Theme } from 'src/components/core/styles';
import Tab from 'src/components/core/Tab';
import Tabs from 'src/components/core/Tabs';
import DefaultLoader from 'src/components/DefaultLoader';
import TabLink from 'src/components/TabLink';
import { DispatchProps } from 'src/containers/kubernetes.container';
import { WithTypesProps } from 'src/containers/types.container';
import { ExtendedCluster } from '.././types';

const useStyles = makeStyles((theme: Theme) => ({
  tabBar: {
    marginTop: 0
  }
}));

const Details = DefaultLoader({
  loader: () => import('./Details')
});

const Resize = DefaultLoader({
  loader: () => import('./ResizeCluster')
});

interface Props {
  cluster: ExtendedCluster;
  nodePoolsLoading: boolean;
}

type CombinedProps = Props &
  DispatchProps &
  WithTypesProps &
  RouteComponentProps<{}>;

export const DetailNavigation: React.FC<CombinedProps> = props => {
  const classes = useStyles();
  const {
    match: { url }
  } = props;

  const tabs = [
    /* NB: These must correspond to the routes inside the Switch */
    { routeName: `${url}/details`, title: 'Details' },
    { routeName: `${url}/resize`, title: 'Resize' }
  ];

  const handleTabChange = (
    event: React.ChangeEvent<HTMLDivElement>,
    value: number
  ) => {
    const { history } = props;
    const routeName = tabs[value].routeName;
    history.push(`${routeName}`);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={tabs.findIndex(tab => matches(tab.routeName))}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          className={classes.tabBar}
        >
          {tabs.map(tab => (
            <Tab
              key={tab.title}
              label={tab.title}
              data-qa-tab={tab.title}
              component={React.forwardRef((tabProps, ref) => (
                <TabLink
                  to={tab.routeName}
                  title={tab.title}
                  {...tabProps}
                  ref={ref}
                />
              ))}
            />
          ))}
        </Tabs>
      </AppBar>
      <Switch>
        <Route
          exact
          path={`${url}/resize`}
          render={() => <Resize {...props} />}
        />
        <Route
          exact
          path={`${url}/details`}
          render={() => <Details {...props} />}
        />
      </Switch>
    </>
  );
};

const matches = (p: string) => {
  return Boolean(matchPath(p, { path: location.pathname }));
};

export default DetailNavigation;
