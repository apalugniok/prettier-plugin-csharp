import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Anonymous Function Expression', () => {
  it('should format an anonymous method expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          var foo = delegate () {};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              var foo = delegate () { };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an async anonymous method expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          var foo = async delegate () {};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              var foo = async delegate () { };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an anonymous method expression with a not empty body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          var foo = async delegate () { Console.WriteLine("foo"); };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              var foo = async delegate ()
              {
                  Console.WriteLine("foo");
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an simple lambda expression with an empty block body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo => {};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo => { };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an simple lambda expression with an expression body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo => Console.WriteLine(foo);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo => Console.WriteLine(foo);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an simple lambda expression with a filled block body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo => {Console.WriteLine(foo)};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo => {
                  Console.WriteLine(foo);
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an parenthesized lambda expression with an empty block body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (foo) => {};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (foo) => { };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an parenthesized lambda expression with an expression body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (foo) => Console.WriteLine(foo);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (foo) => Console.WriteLine(foo);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an parenthesized lambda expression with a filled block body', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (foo) => {Console.WriteLine(foo)};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (foo) => {
                  Console.WriteLine(foo);
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an parenthesized lambda expression with multiple long parameters using new lines', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (reallyReallyReallyLongArgumentA,reallyReallyReallyLongArgumentB,reallyReallyReallyLongArgumentC) => {Console.WriteLine(foo)};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (
                  reallyReallyReallyLongArgumentA,
                  reallyReallyReallyLongArgumentB,
                  reallyReallyReallyLongArgumentC
              ) => {
                  Console.WriteLine(foo);
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
