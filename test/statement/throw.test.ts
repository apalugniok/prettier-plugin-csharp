const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Throw Statement', () => {
  it('should format a throw statement', () => {
    const input = code`
      class Irrelevant {
        int Irrelevant() { 
          throw new Exception();
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Irrelevant()
          {
              throw new Exception();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an empty throw statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          try
          {}
          catch
          {
              throw;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
              catch
              {
                  throw;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
        [Foo, Bar]
              [Baz]
        throw new Exception();

        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              [Foo, Bar]
              [Baz]
              throw new Exception();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
