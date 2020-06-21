const { code, formatCSharpWithPrettier } = require('./helpers/testHelpers');

describe('Extern Alias Directive', () => {
  it('should format an extern alias', () => {
    const input = code`
      extern
       alias   Foo   
          ;
    `;
    const expectedFormattedCode = code`
      extern alias Foo;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })

  it('should format multiple extern aliases', () => {
    const input = code`
      extern
       alias   Foo   
          ;
         extern alias Bar;
    `;
    const expectedFormattedCode = code`
      extern alias Foo;
      extern alias Bar;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })
})