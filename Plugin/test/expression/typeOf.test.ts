import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('TypeOf Expression', () => {
  it('should format a typeof expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          typeof(int);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              typeof(int);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
