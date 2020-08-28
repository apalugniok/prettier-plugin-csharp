const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Var Pattern', () => {
  it('should format a var pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is var bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is var bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
