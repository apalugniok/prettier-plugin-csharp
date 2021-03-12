import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Method Declaration', () => {
  it('should format a block method', () => {
    const input = code`
      class Irrelevant {
        public   int Foo(){  }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo()
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an abstract method', () => {
    const input = code`
      class Irrelevant {
        public 
          abstract int Foo();
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public abstract int Foo();
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic method', () => {
    const input = code`
      class Irrelevant {
        public 
           int Foo<T>() {}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo<T>()
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic method with type constraints', () => {
    const input = code`
      class Irrelevant {
        public 
           int Foo<TValue, TArgument>() where TValue: class, new() where TArgument:class,new() {}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public int Foo<TValue, TArgument>()
              where TValue : class, new()
              where TArgument : class, new()
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a method with long arguments using new lines', () => {
    const input = code`
      class Irrelevant {
        public void Foo(int reallyReallyArgumentNameToCauseALineBreakToHappen, 
        string otherReallyReallyArgumentNameToCauseALineBreakToHappen ) {}
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public void Foo(
              int reallyReallyArgumentNameToCauseALineBreakToHappen,
              string otherReallyReallyArgumentNameToCauseALineBreakToHappen
          )
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a constructor', () => {
    const input = code`
      class Foo {
        public Foo(int bar){}
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
          public Foo(int bar)
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a constructor with an initializer', () => {
    const input = code`
      class Foo : Base {
        public Foo(int bar):base(bar){}
      }
    `;
    const expectedFormattedCode = code`
      class Foo : Base
      {
          public Foo(int bar) : base(bar)
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a constructor and initializer arguments using new lines when the line is too long', () => {
    const input = code`
      class Foo {
        public Foo(int reallyReallyArgumentNameToCauseALineBreakToHappen, 
        string otherReallyReallyArgumentNameToCauseALineBreakToHappen )
        :this(reallyReallyArgumentNameToCauseALineBreakToHappen, otherReallyReallyArgumentNameToCauseALineBreakToHappen){}
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
          public Foo(
              int reallyReallyArgumentNameToCauseALineBreakToHappen,
              string otherReallyReallyArgumentNameToCauseALineBreakToHappen
          ) : this(
              reallyReallyArgumentNameToCauseALineBreakToHappen,
              otherReallyReallyArgumentNameToCauseALineBreakToHappen
          )
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a constructor with an arrow expression body', () => {
    const input = code`
      class Foo {
        public Foo() => 
         placeholderIdentifier;
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
          public Foo() => placeholderIdentifier;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a destructor/finalizer', () => {
    const input = code`
      class Foo {
        ~Foo() { }
      }
    `;
    const expectedFormattedCode = code`
      class Foo
      {
          ~Foo()
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a operator declaration', () => {
    const input = code`
      class Foo {
        public int operator +(Foo a, Foo b) {}
      }
    `;

    const expectedFormattedCode = code`
      class Foo
      {
          public int operator +(Foo a, Foo b)
          { }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a conversion operator declaration', () => {
    const input = code`
      class Foo {
        public 
         static implicit operator int(Foo foo) => 1;
      }
    `;

    const expectedFormattedCode = code`
      class Foo
      {
          public static implicit operator int(Foo foo) => 1;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
