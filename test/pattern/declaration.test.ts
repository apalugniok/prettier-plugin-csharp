const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Declaration Pattern', () => {
  it('should format a declaration pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is Foo  
           bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is Foo bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
