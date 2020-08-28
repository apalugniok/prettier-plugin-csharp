const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Constant Pattern', () => {
  it('should format a constant pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
