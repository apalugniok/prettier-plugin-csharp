const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Cast Expression', () => {
  it('should format a cast expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (Foo)bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (Foo) bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
