import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Conditional Access Expression', () => {
  it('should format a conditional access expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo?.bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo?.bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
