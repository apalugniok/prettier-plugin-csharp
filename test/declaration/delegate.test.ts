const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Delegate Declaration', () => {
  it('should format a delegate declaration', () => {
    const input = code`
      class Irrelevant {
        public 
        delegate int Delegate (int  foo) ;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public delegate int Delegate(int foo);
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic delegate declaration', () => {
    const input = code`
      class Irrelevant {
        public 
        delegate T Delegate<T> (T  foo, int bar) ;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public delegate T Delegate<T>(T foo, int bar);
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic delegate declaration with type constraints', () => {
    const input = code`
      class Irrelevant {
        public 
        delegate T Delegate<T> (T  foo, int bar) where T: new();
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public delegate T Delegate<T>(T foo, int bar) where T : new();
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
