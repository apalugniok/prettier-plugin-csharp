const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Yield Statement', () => {
  it('should format a yield return statement', () => {
    const input = code`
      class Irrelevant {
        IEnumerable<int> Irrelevant() { 
          yield return 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          IEnumerable<int> Irrelevant()
          {
              yield return 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a yield break statement', () => {
    const input = code`
      class Irrelevant {
        IEnumerable<int> Irrelevant() { 
          yield break;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          IEnumerable<int> Irrelevant()
          {
              yield break;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes', () => {
    const input = code`
      class Irrelevant {
          IEnumerable<int> Irrelevant() { 
          [Foo, Bar]
              [Baz]
          yield return 1;
        }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          IEnumerable<int> Irrelevant()
          {
              [Foo, Bar]
              [Baz]
              yield return 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
