import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Variable Declaration', () => {
  it('should format a variable declaration', () => {
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
