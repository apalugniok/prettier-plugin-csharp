import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Throw Expression', () => {
  it('should format a throw expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          () => throw new Exception();
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              () => throw new Exception();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
