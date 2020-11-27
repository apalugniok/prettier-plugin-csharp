const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Do Statement', () => {
  it('should format a do statement', () => {
    const input = code`
      class Irrelevant {
        int Irrelevant() { 
          do
          {
            b++;
          }while(true);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Irrelevant()
          {
              do
              {
                  b++;
              } while (true);
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
          do
          {
            b++;
          }while (reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Irrelevant()
          {
              do
              {
                  b++;
              } while (
                  reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded
              );
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should wrap a single statement do statement with a block', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          do b++; while (true) ;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              do
              {
                  b++;
              } while (true);
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
          do
              {
                b++;
              } while (true);
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
              do
              {
                  b++;
              } while (true);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
