const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Assignment Expression', () => {
  it('should format an invocation expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo 
          =1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo = 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
