import React, {FC, ReactElement, Suspense} from 'react';
import {withAdaptive} from 'react-adaptive';
import {Router} from './router/router';
import {IAppGlobalState} from './app.model';
import {IConfig} from 'core/model/config.model';
import {createGlobalState} from 'react-hooks-global-state';
import classes from './classes.module.less'
import {debounce} from 'throttle-debounce';

const config: IConfig = (process.env.config as unknown as IConfig) || [];

const {useGlobalState, setGlobalState} = createGlobalState<IAppGlobalState>({
  isMobile: false,
  config
});

const setIsMobile = debounce(
  0,
  (size: any) => setGlobalState('isMobile', size.width <= 992)
);

const App: FC = (): ReactElement => {
  return <Suspense fallback={<div>Loading...</div>}>
    <Router></Router>
  </Suspense>
}

const AdaptiveAppComponent = (size: any) => (props: {}) => {
  setIsMobile(size)

  return <App></App>;
}

export default withAdaptive({mapSizeToComponent: AdaptiveAppComponent, wrapperClassName: classes.app});
export {useGlobalState as useAppGlobalState};
