import React, {FC, ReactElement, Suspense} from 'react';
import {withAdaptive} from 'react-adaptive';
import "./App.less";
import {Router} from './app/router/router';
import {IAppGlobalState} from './app.model';
import {IConfig} from 'core/model/config.model';
import {createGlobalState} from 'react-hooks-global-state';

const config: IConfig = (process.env.config as unknown as IConfig) || [];

const {useGlobalState, setGlobalState} = createGlobalState<IAppGlobalState>({
  isMobile: false,
  config
});

const App: FC = (): ReactElement => {
  return <Suspense fallback={<div>Loading...</div>}>
    <Router></Router>
  </Suspense>
}

const AdaptiveAppComponent = (size: any) => (props: {}) => {
  if (size.width !== 0) {
    setGlobalState('isMobile', size.width <= 992);
  }

  return <App></App>;
}

export default withAdaptive({mapSizeToComponent: AdaptiveAppComponent, wrapperClassName: 'App'});
export {useGlobalState as useAppGlobalState};
