import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortKeys = _.sortBy(keys);

  const result = sortKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return { key: key, value1: obj1[key], value2: obj2[key], type: 'updated' };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });

  return result;
};

export default buildTree;
