import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Binary Expression', () => {
  it('should format a binary expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          1 > 3;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              1 > 3;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
