import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Try Statement', () => {
  it('should format a try statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          try {
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a try statement with catch clauses', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          try {
          } catch (IllegalArgumentException e) {} 
          catch (Exception e) {}
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
              catch (IllegalArgumentException e)
              { }
              catch (Exception e)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a try statement with a catch clause that has a filter expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          try {
          } catch (IllegalArgumentException e) when (true) {}
          
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
              catch (IllegalArgumentException e) when (true)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should use new liens when the catch clause is too long', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          try {
          } catch (reallyReallyReallyReallyLongExceptionTypeToCauseLineLengthLimitToBeExceeded e) when (true) {}
          
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
              catch (
                  reallyReallyReallyReallyLongExceptionTypeToCauseLineLengthLimitToBeExceeded e
              ) when (true)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should use new liens when the catch clause filter is too long', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          try {
          } catch (IllegalArgumentException e) when (reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded) {}
          
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
              catch (IllegalArgumentException e) when (
                  reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded
              )
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a try statement with a finally clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          try {
          } 
          finally {}
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              try
              { }
              finally
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
