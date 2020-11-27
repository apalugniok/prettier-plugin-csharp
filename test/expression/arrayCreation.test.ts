import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Array Creation Expression', () => {
  it('should format an array creation expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          new int[] {1, 2};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              new int[] { 1, 2 };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a long array creation expression using new lines', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          new string[] {"reallyLongLongStringToCauseLineLengthToBeExceeded", "reallyLongLongStringToCauseLineLengthToBeExceeded"};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              new string[]
              {
                  "reallyLongLongStringToCauseLineLengthToBeExceeded",
                  "reallyLongLongStringToCauseLineLengthToBeExceeded",
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});

describe('Implicit Array Creation Expression', () => {
  it('should format an implicit array creation expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          new[] {1, 2};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              new[] { 1, 2 };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a two dimensional implicit array creation expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          new[,] {{1},{2}};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              new[,] {{ 1 }, { 2 }};
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
