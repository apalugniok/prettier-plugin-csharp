const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Local Declaration Statement', () => {
  it('should format a local declaration', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          var foo = 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              var foo = 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a local using declaration', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          using var disposable = new StreamWriter();
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              using var disposable = new StreamWriter();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
