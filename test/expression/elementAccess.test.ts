import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Element Access Expression', () => {
  it('should format an element access expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          array[1];
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              array[1];
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
