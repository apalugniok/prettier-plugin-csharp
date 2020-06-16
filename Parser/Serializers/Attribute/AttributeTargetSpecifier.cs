using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers.Attribute
{
    public class AttributeTargetSpecifierSerializer: SyntaxNodeSerializer<AttributeTargetSpecifierSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeTargetSpecifierSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("target", value.Identifier.ValueText);
        }
    }
}