import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Fixed Statement', () => {
  it('should format a fixed statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          fixed (int* p = &pt.x)
            {
                *p = 1;
            }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              fixed (int* p = &pt.x)
              {
                  *p = 1;
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
          fixed (int* p = &pt.x)
            {
                *p = 1;
            }
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
              fixed (int* p = &pt.x)
              {
                  *p = 1;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
