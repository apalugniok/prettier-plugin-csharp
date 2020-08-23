const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Array Type', () => {
  it('should format an array type', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int[] a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int[] a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an array type with a rank specifier', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int[1,2] a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int[1, 2] a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an array type with multiple rank specifiers', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int[][] a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int[][] a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
