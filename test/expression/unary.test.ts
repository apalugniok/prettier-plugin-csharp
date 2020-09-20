const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Prefix and Postfix Unary Expression', () => {
  it('should format a prefix unary expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          ++bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              ++bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a prefix unary expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          bar++;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              bar++;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
