import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Enum Declaration', () => {
  it('should format an enum declaration', () => {
    const input = code`
      enum Foo {
        Bar
      }
    `;
    const expectedFormattedCode = code`
      enum Foo
      {
          Bar,
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an enum declaration with multiple members', () => {
    const input = code`
      enum Foo {
        Bar,   Baz
      }
    `;
    const expectedFormattedCode = code`
      enum Foo
      {
          Bar,
          Baz,
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an enum declaration with default values', () => {
    const input = code`
      enum Foo {
        Bar = 1
      }
    `;
    const expectedFormattedCode = code`
      enum Foo
      {
          Bar = 1,
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
