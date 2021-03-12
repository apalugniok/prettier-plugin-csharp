import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Switch Statement', () => {
  it('should format a switch statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          switch (1){
            case 1:
              break;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              switch (1)
              {
                  case 1:
                      break;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format use a new line when the expression is too long', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          switch (reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded){
            case 1:
              break;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              switch (
                  reallyReallyReallyReallyLongConditionToCauseLineLengthLimitToBeExceeded
              )
              {
                  case 1:
                      break;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a case pattern switch label', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          switch (1){
            case int a:
              break;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              switch (1)
              {
                  case int a:
                      break;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a default switch label', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          switch (1){
            default:
              break;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              switch (1)
              {
                  default:
                      break;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a multiple cases', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          switch (1){
            case 1:
            case 2:
              break;
            case 3:
              var a = 1;
              break;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              switch (1)
              {
                  case 1:
                  case 2:
                      break;
                  case 3:
                      var a = 1;
                      break;
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
          switch (1)
          {
              case 1:
                  break;
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
              switch (1)
              {
                  case 1:
                      break;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
