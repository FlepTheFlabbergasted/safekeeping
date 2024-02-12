import { mergeDeep } from './merge-deep';

describe('mergeDeep', () => {
  it('should merge objects', () => {
    const obj1 = { key1: { key2: 'value2' } };
    const obj2 = { key1: { key3: 'value3' } };

    expect(mergeDeep({}, obj1, obj2)).toStrictEqual({ key1: { key2: 'value2', key3: 'value3' } });
  });

  it('should favor left hand side if one value is a primitive but the other an object', () => {
    const obj1 = { key1: { key2: 'value2' } };
    const obj2 = { key1: { key2: { key3: 'value3' } } };

    expect(mergeDeep({}, obj1, obj2)).toStrictEqual({ key1: { key2: 'value2' } });
  });

  it('should merge arrays', () => {
    const obj1 = { key1: ['one', 'two'] };
    const obj2 = { key1: ['one', 'three'] };

    expect(mergeDeep({}, obj1, obj2)).toStrictEqual({ key1: ['one', 'three'] });
  });
});
