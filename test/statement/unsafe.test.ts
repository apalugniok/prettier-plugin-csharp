import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Unsafe Statement', () => {
  it('should format an unsafe statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          unsafe { var a = 1; } 
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              unsafe
              {
                  var a = 1;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
        [Foo, Bar]
              [Baz]
          unsafe { var a = 1; } 
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              [Foo, Bar]
              [Baz]
              unsafe
              {
                  var a = 1;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
