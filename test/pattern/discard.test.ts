import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Discard Pattern', () => {
  it('should format a discard pattern', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo is Foo {Bar: _};
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo is Foo { Bar: _ };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
