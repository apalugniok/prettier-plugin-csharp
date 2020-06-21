using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class TypeParameterConstraintClauseSerializer: SyntaxNodeSerializer<TypeParameterConstraintClauseSyntax>
     {
         protected override void WriteObjectProperties(Utf8JsonWriter writer, TypeParameterConstraintClauseSyntax value,
             JsonSerializerOptions options)
         {
             writer.WriteString("name", value.Name.Identifier.ValueText);
             writer.WriteSerializedValue("constraints", value.Constraints, options);
         }
     }
    
    public class ClassOrStructConstraintSerializer: SyntaxNodeSerializer<ClassOrStructConstraintSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ClassOrStructConstraintSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("constraint", value.ClassOrStructKeyword.ValueText + value.QuestionToken.ValueText);
        }
    }

    public class ConstructorConstraintSyntaxSerializer: SyntaxNodeSerializer<ConstructorConstraintSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ConstructorConstraintSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("constraint", "new()");
        }
    }
    
    public class TypeConstraintSyntaxSerializer: SyntaxNodeSerializer<TypeConstraintSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, TypeConstraintSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("constraint", value.Type, options);
        }
    }
}