import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Default Expression', () => {
  it('should format a default expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          default(int);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              default(int);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
