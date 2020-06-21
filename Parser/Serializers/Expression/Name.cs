using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class AliasQualifiedNameSerializer : SyntaxNodeSerializer<AliasQualifiedNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AliasQualifiedNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("alias", value.Alias, options);
            writer.WriteSerializedValue("name", value.Name, options);
        }
    }
    
    public class QualifiedNameSerializer : SyntaxNodeSerializer<QualifiedNameSyntax>
         {
             protected override void WriteObjectProperties(Utf8JsonWriter writer, QualifiedNameSyntax value, JsonSerializerOptions options)
             {
                 writer.WriteSerializedValue("left", value.Left, options);
                 writer.WriteSerializedValue("right", value.Right, options);
             }
         }
    
    public class GenericNameSerializer : SyntaxNodeSerializer<GenericNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, GenericNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.Text);
            writer.WriteSerializedValue("typeArguments", value.TypeArgumentList, options);
        }
    }
    
    public class IdentifierNameSerializer : SyntaxNodeSerializer<IdentifierNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, IdentifierNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.ValueText);
        }
    }
}