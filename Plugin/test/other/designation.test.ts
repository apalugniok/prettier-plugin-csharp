import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Variable Designation', () => {
  it('should format a parenthesized variable designation', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is var (bar1,
           bar2, bar3);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is var (bar1, bar2, bar3);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
