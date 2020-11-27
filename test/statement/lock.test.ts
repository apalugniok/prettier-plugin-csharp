import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Lock Statement', () => {
  it('should format a lock statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          lock (foo)
          {
             var a = 1;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              lock (foo)
              {
                  var a = 1;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a lock statement with a single statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          lock (foo)
          service.Foo();
          
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              lock (foo)
                  service.Foo();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should use new line when the lock expression breaks the line length limit', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          lock (reallyReallyReallyLongVariableToCauseTheLineLenghtLimitToBeDefinitelyExceeded)
          service.Foo();
          
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              lock (
                  reallyReallyReallyLongVariableToCauseTheLineLenghtLimitToBeDefinitelyExceeded
              )
                  service.Foo();
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
          lock (foo)
              {
                  var a = 1;
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
              lock (foo)
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
