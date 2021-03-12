import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Struct Declaration', () => {
  it('should format an empty declaration', () => {
    const input = code`
      struct Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with modifiers', () => {
    const input = code`
      public static 
        struct Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      public static struct Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic declaration', () => {
    const input = code`
      struct Foo<T, U> {
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo<T, U>
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format variance keywords in a generic declaration', () => {
    const input = code`
      struct Foo< in T,
       out U> {
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo<in T, out U>
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a type constraint', () => {
    const input = code`
      struct Foo<T> where 
        T : Bar{
      
      }
    `;
    const expectedFormattedCode = code`
     struct Foo<T> where T : Bar
     {
     }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a type constraint with multiple constraints', () => {
    const input = code`
      struct Foo<T> where 
        T : Bar, struct?,
         new(){
      
      }
    `;
    const expectedFormattedCode = code`
     struct Foo<T> where T : Bar, struct?, new()
     {
     }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format multiple long type constraints with multiple constraints per type with line breaks', () => {
    const input = code`
      struct Foo<TypeOne, TypeTwo> where 
        TypeOne : Bar, struct?,
         new() where TypeTwo :  struct,
         new(){
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo<TypeOne, TypeTwo>
          where TypeOne : Bar, struct?, new()
          where TypeTwo : struct, new()
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a base type', () => {
    const input = code`
      struct Foo: 
      Base {
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo : Base
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with multiple base types', () => {
    const input = code`
      struct Foo: 
      BaseOne, 
        BaseTwo {
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo : BaseOne, BaseTwo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with multiple long base types with line breaks', () => {
    const input = code`
      struct Foo: 
      ReallyLongBaseTypeOneToCauseLineBreak, 
        ReallyLongBaseTypeTwoToCauseLineBreak {
      
      }
    `;
    const expectedFormattedCode = code`
      struct Foo :
          ReallyLongBaseTypeOneToCauseLineBreak,
          ReallyLongBaseTypeTwoToCauseLineBreak
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with an attribute', () => {
    const input = code`
      [Bar]
      struct Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      [Bar]
      struct Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a single member', () => {
    const input = code`
      struct Foo {
        int    bar;
      }
    `;
    const expectedFormattedCode = code`
      struct Foo
      {
          int bar;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a multiple members', () => {
    const input = code`
      struct Foo {
        int    bar;
        public int Bar {get;}
      }
    `;
    const expectedFormattedCode = code`
      struct Foo
      {
          int bar;
          public int Bar { get; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
