import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Binary Pattern', () => {
  it('should format a binary pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          test is foo and bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              test is foo and bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
