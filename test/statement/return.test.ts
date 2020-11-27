const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Return Statement', () => {
  it('should format a return statement', () => {
    const input = code`
      class Irrelevant {
        int Irrelevant() { 
          return 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Irrelevant()
          {
              return 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an empty return statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          return;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              return;
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
          return;
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
              return;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
