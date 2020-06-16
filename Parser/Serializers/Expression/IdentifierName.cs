using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class IdentifierNameSerializer : SyntaxNodeSerializer<IdentifierNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, IdentifierNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.ValueText);
        }
    }
}