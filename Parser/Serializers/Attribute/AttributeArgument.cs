using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers.Attribute
{
    public class AttributeArgumentSerializer: SyntaxNodeSerializer<AttributeArgumentSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeArgumentSyntax value, JsonSerializerOptions options)
        {
            //todo
        }
    }
}