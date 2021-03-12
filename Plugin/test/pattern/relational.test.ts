import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Relational Pattern', () => {
  it('should format a relational pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          c is >= 'a';
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              c is >= 'a';
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
