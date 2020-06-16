using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class NameEqualsSerializer : SyntaxNodeSerializer<NameEqualsSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, NameEqualsSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Name.Identifier.ValueText);
        }
    }
}