using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class PredefinedTypeSerializer : SyntaxNodeSerializer<PredefinedTypeSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, PredefinedTypeSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("value", value.Keyword.ValueText);
        }
    }
}