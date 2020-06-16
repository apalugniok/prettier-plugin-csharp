using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Attribute
{
    public class AttributeSerializer: SyntaxNodeSerializer<AttributeSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("name", value.Name, options);
            writer.WriteSerializedValueOrNull("arguments", value.ArgumentList, options);
        }
    }
}