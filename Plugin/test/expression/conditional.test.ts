import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Conditional Expression', () => {
  it('should format a conditional expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          true ? 3 : 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              true ? 3 : 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a long conditional expression with new lines', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          var result = reallyReallyLongLongConditionToCauseLineLengthLimitToBeExceeded ? longLongReturnValue : otherLongLongReturnValue;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              var result = reallyReallyLongLongConditionToCauseLineLengthLimitToBeExceeded
                  ? longLongReturnValue
                  : otherLongLongReturnValue;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
