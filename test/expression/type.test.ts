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

describe('Predefined Type', () => {
  it('should format a predefined type', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});

describe('Nullable Type', () => {
  it('should format a nullable type', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int? a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int? a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});

describe('Pointer Type', () => {
  it('should format a pointer type', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int* a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int* a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});

describe('Tuple Type', () => {
  it('should format a tuple type', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          (int x, int y) a;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              (int x, int y) a;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});

//TODO omitted type argument
