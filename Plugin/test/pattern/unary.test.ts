import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Unary Pattern', () => {
  it('should format a unary pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          c is not null;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              c is not null;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
