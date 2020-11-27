import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Invocation Expression', () => {
  it('should format an invocation expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo.Where();
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo.Where();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an chained invocations using new lines ', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo.Where().Select().Where().Where().Select().Where().Where().Select().Where().Where().Select().Where();
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo.Where()
                  .Select()
                  .Where()
                  .Where()
                  .Select()
                  .Where()
                  .Where()
                  .Select()
                  .Where()
                  .Where()
                  .Select()
                  .Where();
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
