import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Range Expression', () => {
  it('should format a binary expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          array[1..2];
          array[1..^2];
          array[1..];
          array[..];
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              array[1..2];
              array[1..^2];
              array[1..];
              array[..];
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
