const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('If Statement', () => {
  it('should format an if statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          if (true) {
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              if (true)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an if statement with an else clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          if (true) {
          } else {}
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              if (true)
              { }
              else
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an if statement with else if clauses', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          if (true) {
          } else if () {} else if () {}
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              if (true)
              { }
              else if ()
              { }
              else if ()
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an if statement with an attribute', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
        [Foo]
          if (true) {
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              [Foo]
              if (true)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should use a new line for the condition if it exceeds the line length limit', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
        [Foo]
          if (reallyReallyReallyLongVariableToCauseTheLineLenghtLimitToBeDefinitelyExceeded) {
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              [Foo]
              if (
                  reallyReallyReallyLongVariableToCauseTheLineLenghtLimitToBeDefinitelyExceeded
              )
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
