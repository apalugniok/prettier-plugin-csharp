import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Goto Statement', () => {
  it('should format a goto statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          goto Label;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              goto Label;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a goto statement with a case keyword', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          goto case 1;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              goto case 1;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a goto statement with a default keyword', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() { 
          goto default;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              goto default;
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
          goto Label;
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
              goto Label;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
