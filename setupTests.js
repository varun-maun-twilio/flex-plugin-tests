import 'regenerator-runtime/runtime';
import { resetReduxState } from './test-utils/flex-redux';
import { resetServiceConfiguration } from './test-utils/flex-service-configuration';

afterEach(() => {
  resetServiceConfiguration();
  resetReduxState();
});