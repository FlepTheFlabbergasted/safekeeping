import { getFlippedEnumMap } from './get-flipped-enum-map';

describe('getFlippedEnumMap', () => {
  type FooBarEnum = 'FOO' | 'BAR';

  const fooBarEnum = {
    Foo: 'FOO' as FooBarEnum,
    Bar: 'BAR' as FooBarEnum,
  };

  enum NumberEnum {
    One = 'ONE',
    Two = 'TWO',
  }

  it('should handle object constant enums', () => {
    expect(getFlippedEnumMap(fooBarEnum)).toStrictEqual(
      new Map([
        ['FOO', 'Foo'],
        ['BAR', 'Bar'],
      ])
    );
  });

  it('should handle enums', () => {
    expect(getFlippedEnumMap(NumberEnum)).toStrictEqual(
      new Map([
        ['ONE', 'One'],
        ['TWO', 'Two'],
      ])
    );
  });
});
