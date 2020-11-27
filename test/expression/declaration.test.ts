import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Declaration Expression', () => {
  it('should format a declaration expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          IrrelevantMethod(out
           int   foo);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              IrrelevantMethod(out int foo);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration expression with a discard designation', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          IrrelevantMethod(out
           int   _);
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              IrrelevantMethod(out int _);
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
