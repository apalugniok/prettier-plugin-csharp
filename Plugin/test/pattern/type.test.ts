import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Type Pattern', () => {
  it('should format a type pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          c is not int;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              c is not int;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
