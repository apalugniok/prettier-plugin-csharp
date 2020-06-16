const { code, formatCSharpWithPrettier } = require('./helpers/testHelpers');

describe('Using Directive', () => {
  it('simple', () => {
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

  it('alias', () => {
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

  it('static', () => {
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

  it('qualified name', () => {
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

  it('alias qualified name', () => {
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

  it('generics', () => {
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
  
  it('multiple', () => {
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
});
