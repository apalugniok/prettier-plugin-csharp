const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Checked Expression', () => {
  it('should format a checked expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          checked(1 + 2);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              checked(1 + 2);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
