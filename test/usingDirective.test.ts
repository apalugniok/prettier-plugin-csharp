const { code, formatCSharpWithPrettier } = require('./helpers/testHelpers');

describe('Using Directive', () => {
  it('should format a simple directive', () => {
    const input = code`
      using   System   
          ;
    `;
    const expectedFormattedCode = code`
      using System;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an aliased directive', () => {
    const input = code`
      using  Alias = System   
          ;
    `;
    const expectedFormattedCode = code`
      using Alias = System;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a static directive', () => {
    const input = code`
      using  static System   
          ;
    `;
    const expectedFormattedCode = code`
      using static System;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a directive with a qualified name', () => {
    const input = code`
      using   System . Math  
          ;
    `;
    const expectedFormattedCode = code`
      using System.Math;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a directive with an alias qualified name', () => {
    const input = code`
      using  global::   System   
          ;
    `;
    const expectedFormattedCode = code`
      using global::System;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a directive with generic arguments', () => {
    const input = code`
      using  MyClass 
        <int, string>   
          ;
    `;
    const expectedFormattedCode = code`
      using MyClass<int, string>;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format multiple directives', () => {
    const input = code`
      using  System ;
      using System.IO;
    `;
    const expectedFormattedCode = code`
      using System;
      using System.IO;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a directive with multiple syntax features', () => {
    const input = code`
      using static Alias 
      = global::System.Foo<int, string>   
          ;
    `;
    const expectedFormattedCode = code`
      using static Alias = global::System.Foo<int, string>;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
