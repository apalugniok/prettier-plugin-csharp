const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('While Statement', () => {
  it('should format a while statement', () => {
    const input = code`
      class Irrelevant {
        int Irrelevant() { 
          while (true)
          {
            b++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Irrelevant()
          {
              while (true)
              {
                  b++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a use new lines when the condition is too long', () => {
    const input = code`
      class Irrelevant {
        int Irrelevant() { 
          while (reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded)
          {
            b++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Irrelevant()
          {
              while (
                  reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded
              )
              {
                  b++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should wrap a single statement while with a block', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          while (true) b++;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              while (true)
              {
                  b++;
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
          while (true)
          {
            b++;
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
              while (true)
              {
                  b++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
