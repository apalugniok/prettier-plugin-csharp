const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Member Access Expression', () => {
  it('should format a member access expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo.Bar;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo.Bar;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a chained accesses using new lines ', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          foo.PropertyA.PropertyB.PropertyA.PropertyA.PropertyB.PropertyA.PropertyA.PropertyB.PropertyA.PropertyA.PropertyB.PropertyA;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foo.PropertyA
                  .PropertyB
                  .PropertyA
                  .PropertyA
                  .PropertyB
                  .PropertyA
                  .PropertyA
                  .PropertyB
                  .PropertyA
                  .PropertyA
                  .PropertyB
                  .PropertyA;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
