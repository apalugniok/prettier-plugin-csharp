const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Tuple Expression', () => {
  it('should format a tuple expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (1, 2);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (1, 2);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a tuple expression with long arguments using new lines', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (reallyReallyReallyLongArgument, reallyReallyReallyLongArgument, reallyReallyReallyLongArgument);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (
                  reallyReallyReallyLongArgument,
                  reallyReallyReallyLongArgument,
                  reallyReallyReallyLongArgument
              );
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
