import yaml from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`${extension} is undefined`);
  }
};

export default parse;
