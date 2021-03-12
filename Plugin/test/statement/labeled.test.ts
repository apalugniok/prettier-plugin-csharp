import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Labeled Statement', () => {
  it('should format a labeled statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Label: var foo = 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Label:
                  var foo = 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should not indent following statements', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Label: var foo = 1;
          var bar = 2;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Label:
                  var foo = 1;
              var bar = 2;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          [Foo, Bar]
              [Baz]
          Label: var foo = 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              [Foo, Bar]
              [Baz]
              Label:
                  var foo = 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
