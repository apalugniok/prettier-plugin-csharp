import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('For Statement', () => {
  it('should format a for statement with a declaration', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          for (int i = 1; i < 0; i++){
          j++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              for (int i = 1; i < 0; i++)
              {
                  j++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an empty for statement', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          for (int i = 1; i < 0; i++){
          
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              for (int i = 1; i < 0; i++)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should wrap a single statement for loop in a block', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          for (int i =1; i < 0; i++)
          j++;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              for (int i = 1; i < 0; i++)
              {
                  j++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should use new line when the declaration is too long', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          for (int longVariableDeclarationToCauseTheLineLengthLimitToBeExceeded = 0; longVariableDeclarationToCauseTheLineLengthLimitToBeExceeded < 0; longVariableDeclarationToCauseTheLineLengthLimitToBeExceeded++)
          j++;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              for (
                  int longVariableDeclarationToCauseTheLineLengthLimitToBeExceeded = 0;
                  longVariableDeclarationToCauseTheLineLengthLimitToBeExceeded < 0;
                  longVariableDeclarationToCauseTheLineLengthLimitToBeExceeded++
              )
              {
                  j++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a for statement with initializers', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
        int i;
        int j = 0;
          for (i = 0, Console.WriteLine(); i < j; i++, j--){
          j++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int i;
              int j = 0;
              for (i = 0, Console.WriteLine(); i < j; i++, j--)
              {
                  j++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a for statement without a condition', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          for (int i = 1;; i++){
          j++;
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              for (int i = 1;; i++)
              {
                  j++;
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
          for (int i; i < 0; i++)
            {
              j++;
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
              for (int i; i < 0; i++)
              {
                  j++;
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
