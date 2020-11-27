import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Recursive Pattern', () => {
  it('should format a recursive pattern with positional patterns', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is Foo 
          (1,2);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is Foo (1, 2);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a recursive pattern with a property patterns', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is Foo {Bar:1};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is Foo { Bar: 1 };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a recursive pattern with a designation', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
         foo is Foo () fooA;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is Foo () fooA;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format nested recursive patterns', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is Foo { Bar: Baz (1) { Fez: 3, Bang: 4 } };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is Foo { Bar: Baz (1) { Fez: 3, Bang: 4 } };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
