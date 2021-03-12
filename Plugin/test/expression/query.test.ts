import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Query Expression', () => {
  it('should format a query expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          from score in scores 
          select score;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from score in scores select score;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a query body with clauses', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          from score in scores orderby score
          select score;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from score in scores orderby score select score;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a continuation', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          from score in scores select score into 
          scoreA 
          select scoreA;
      
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from score in scores select score into scoreA select scoreA;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with an orderby clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          from score in scores orderby score ascending, score descending select score ;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from score in scores
                  orderby score ascending, score descending
                  select score;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a let clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          from score in scores let scoreA = score select scoreA ;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from score in scores let scoreA = score select scoreA;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a where clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          from score in scores  where score >  3 select   scoreA;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from score in scores where score > 3 select scoreA;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a join clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
           from cat in categories
           join 
           prod in products on cat equals prod.Category
           select prod;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from cat in categories
                  join prod in products on cat equals prod.Category
                  select prod;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a join clause with a type', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
           from cat in categories
           join 
           Product prod in products on cat equals prod.Category
           select prod;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from cat in categories
                  join Product prod in products on cat equals prod.Category
                  select prod;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a join clause and join into clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
           from cat in categories
              join prod in products
               on cat equals prod.Category into  prodCat
              select prodCat;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from cat in categories
                  join prod in products on cat equals prod.Category into prodCat
                  select prodCat;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a query expression with a group clause', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
           from cat in categories
           group cat by cat.CategoryTypeCode;
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              from cat in categories group cat by cat.CategoryTypeCode;
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
