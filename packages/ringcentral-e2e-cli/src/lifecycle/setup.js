import createDriver from 'ringcentral-e2e-environment/createDriver';
import config, { getDriverConfig } from '../config';
import {
  isNil,
  isPlainobject
} from '../utils/checkType';
// import screenshot from '../plugins/screenshot';
// import logger from '../plugins/logger';

function getPattern(value) {
  let pattern;
  if (Array.isArray(value)) {
    pattern = value;
  } else if (isPlainobject(value)) {
    pattern = Object.keys(value);
  } else if (!isNil(value)) {
    pattern = [value];
  } else {
    pattern = null;
  }
  return pattern;
}

function flattenTestConfig(config) {
  const generalParams = Object.entries(config.params).filter(([key]) => key !== 'projects');
  return Object.entries(config.params.projects).reduce(
    (projects, [project, {
      params = []
    } = {}]) => ([
      ...projects, [
        project,
        Object.entries(params).reduce((patterns, [name, pattern]) => {
          const values = getPattern(pattern);
          if (!values) return patterns;
          return ({
            ...patterns,
            [name]: values,
          });
        }, generalParams.reduce((generalParams, [name, values]) => ({
          ...generalParams,
          [name]: values
        }), {}))
      ]
    ]), []);
}

function setup({
  config,
  plugins,
}) {
  global.defaultTestConfig = flattenTestConfig(config);
  global.testBeforeAll = ({ caseParams, execTags, }) => {
    // TODO HOOK and setup plugins
  };
  global.testBeforeEach = ({
    caseParams,
    option,
    tag,
    level
  }, {
    drivers,
    driver,
    modes,
    isSandbox,
  }) => {
    // TODO HOOK setup plugins
    const browser = isSandbox ? createDriver(driver) : drivers[driver];
    const config = getDriverConfig({
      projects: global.execGlobal.params.projects,
      tag,
    });
    return {
      browser,
      config,
    };
  };
}

const setting = {
  config,
  // plugins: [screenshot, logger]
};

setup(setting);