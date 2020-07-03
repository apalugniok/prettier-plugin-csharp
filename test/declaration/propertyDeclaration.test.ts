const { code, formatCSharpWithPrettier } = require("../helpers/testHelpers");

describe('Property Declaration', () => {
  it('should format a property with an arrow expression', () => {
    const input = code`
      class Irrelevant {
        public int Foo => 1;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo => 1;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an auto-property', () => {
    const input = code`
      class Irrelevant {
        int Foo {get;
        set;}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Foo { get; set; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an auto-property with an initializer', () => {
    const input = code`
      class Irrelevant {
        int Foo {get;
        set;}=2;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Foo { get; set; } = 2;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an auto-property with accessor modifiers', () => {
    const input = code`
      class Irrelevant {
        int Foo {get;
        private 
          set;}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int Foo { get; private set; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a property with an explicit interface specifier', () => {
    const input = code`
      class Irrelevant {
        int IBar.  Foo {get;
        private 
          set;}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int IBar.Foo { get; private set; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a property with accessor bodies', () => {
    const input = code`
      class Irrelevant {
      int foo;
        int Foo { get => foo; 
        set   {
        }
         }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int foo;
          int Foo { get => foo; set {} }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a property with long accessor bodies using line breaks', () => {
    const input = code`
      class Irrelevant {
      int reallyReallyLongFieldNameToCauseALineBreakToHappen;
        int Foo { get => reallyReallyLongFieldNameToCauseALineBreakToHappen; 
        set   {
        }
         }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int reallyReallyLongFieldNameToCauseALineBreakToHappen;
          int Foo
          {
              get => reallyReallyLongFieldNameToCauseALineBreakToHappen;
              set {}
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a property accessors using line breaks when the property name is too long', () => {
    const input = code`
      class Irrelevant {
        int ReallyReallyReallyLongFieldNameToCauseALineBreakToHappen { get => 1; 
        set   {
        }
         }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int ReallyReallyReallyLongFieldNameToCauseALineBreakToHappen
          {
              get => 1;
              set {}
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
  
  it('should format an auto-property with accessor bodies', () => {
    const input = code`
      class Irrelevant {
      int foo;
        int Foo { get => foo; 
        set   {
        }
         }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int foo;
          int Foo { get => foo; set {} }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
  
  it('should format an indexer property', () => {
    const input = code`
      class Irrelevant
      {
         public int this[int i]
         {
            
         }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int this[int i] {}
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an event property', () => {
    const input = code`
      class Irrelevant
      {
          event 
          EventHandler Foo { add {
       } remove {
          }  
          }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          event EventHandler Foo { add {} remove {} }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
  
  //todo 
})