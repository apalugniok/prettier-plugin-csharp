const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Method Declaration', () => {
  it('should format a block method', () => {
    const input = code`
      class Irrelevant {
        public   int Foo(){  }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo()
          {}
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an abstract method', () => {
    const input = code`
      class Irrelevant {
        public 
          abstract int Foo();
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public abstract int Foo();
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic method', () => {
    const input = code`
      class Irrelevant {
        public 
           int Foo<T>() {}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo<T>()
          {}
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic method with type constraints', () => {
    const input = code`
      class Irrelevant {
        public 
           int Foo<TValue, TArgument>() where TValue: class, new() where TArgument:class,new() {}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo<TValue, TArgument>()
              where TValue : class, new()
              where TArgument : class, new()
          {}
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
