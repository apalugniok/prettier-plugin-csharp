import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Class Declaration', () => {
  it('should format an empty declaration', () => {
    const input = code`
      class Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with modifiers', () => {
    const input = code`
      public static 
        class Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      public static class Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic declaration', () => {
    const input = code`
      class Foo<T, U> {
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo<T, U>
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format variance keywords in a generic declaration', () => {
    const input = code`
      class Foo< in T,
       out U> {
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo<in T, out U>
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a type constraint', () => {
    const input = code`
      class Foo<T> where 
        T : Bar{
      
      }
    `;
    const expectedFormattedCode = code`
     class Foo<T> where T : Bar
     {
     }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a type constraint with multiple constraints', () => {
    const input = code`
      class Foo<T> where 
        T : Bar, class?,
         new(){
      
      }
    `;
    const expectedFormattedCode = code`
     class Foo<T> where T : Bar, class?, new()
     {
     }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format multiple long type constraints with multiple constraints per type with line breaks', () => {
    const input = code`
      class Foo<TypeOne, TypeTwo> where 
        TypeOne : Bar, class?,
         new() where TypeTwo :  struct,
         new(){
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo<TypeOne, TypeTwo>
          where TypeOne : Bar, class?, new()
          where TypeTwo : struct, new()
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a base type', () => {
    const input = code`
      class Foo: 
      Base {
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo : Base
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with multiple base types', () => {
    const input = code`
      class Foo: 
      BaseOne, 
        BaseTwo {
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo : BaseOne, BaseTwo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with multiple long base types with line breaks', () => {
    const input = code`
      class Foo: 
      ReallyLongBaseTypeOneToCauseLineBreak, 
        ReallyLongBaseTypeTwoToCauseLineBreak {
      
      }
    `;
    const expectedFormattedCode = code`
      class Foo :
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
      class Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      [Bar]
      class Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a single member', () => {
    const input = code`
      class Foo {
        int    bar;
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
          int bar;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a multiple members', () => {
    const input = code`
      class Foo {
        int    bar;
        public int Bar {get;}
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
          int bar;
          public int Bar { get; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a record', () => {
    const input = code`
      public record Person
      {
            public string? FirstName { get; set; }
       public string? LastName { get; set; }
      }
    `;
    const expectedFormattedCode = code`
      public record Person
      {
          public string? FirstName { get; set; }
          public string? LastName { get; set; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
