import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('SizeOf Expression', () => {
  it('should format a sizeof expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          sizeof(int);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              sizeof(int);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
