import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('ForEach Statement', () => {
  it('should format a foreach statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          foreach (int i in List){
          i++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foreach (int i in List)
              {
                  i++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an await foreach statement', () => {
    const input = code`
      class Irrelevant {
        async Task Irrelevant()
        {
          await foreach (int i in List){
          i++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          async Task Irrelevant()
          {
              await foreach (int i in List)
              {
                  i++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should wrap a single statement foreach loop in a block', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          foreach (int i in List)
          i++;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foreach (int i in List)
              {
                  i++;
              }
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
          foreach (int i in List){
          i++;
          }
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
              foreach (int i in List)
              {
                  i++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});

describe('ForEach Variable Statement', () => {
  it('should format a foreach variable statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          foreach (var i in List){
          i++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foreach (var i in List)
              {
                  i++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an await foreach variable statement', () => {
    const input = code`
      class Irrelevant {
        async Task Irrelevant()
        {
          await foreach (var i in List){
          i++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          async Task Irrelevant()
          {
              await foreach (var i in List)
              {
                  i++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should wrap a single statement foreach variable loop in a block', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          foreach (var i in List)
          i++;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              foreach (var i in List)
              {
                  i++;
              }
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
          foreach (var i in List){
          i++;
          }
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
              foreach (var i in List)
              {
                  i++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
