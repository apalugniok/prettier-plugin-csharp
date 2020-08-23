const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Stackalloc Expressions', () => {
  it('should format an implicit stackalloc array expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          stackalloc [] {};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              stackalloc[] {};
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a stackalloc array expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          stackalloc int[] {1,2};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              stackalloc int[] { 1, 2 };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
