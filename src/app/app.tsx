import React, {ReactElement, Suspense} from 'react';
import {Router} from './router/router';
import {IAppGlobalState} from './app.model';
import {IConfig} from 'core/model/config.model';
import {createGlobalState} from 'react-hooks-global-state';

const config: IConfig = (process.env.config as unknown as IConfig) || [];
const {useGlobalState} = createGlobalState<IAppGlobalState>({config});

export default (): ReactElement => {
  return <Suspense fallback={<div>Loading...</div>}>
    <Router></Router>
  </Suspense>
}
export {useGlobalState as useAppGlobalState};
