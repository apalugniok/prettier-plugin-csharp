using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Attribute
{
    public class AttributeListSerializer: SyntaxNodeSerializer<AttributeListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributes", value.Attributes, options);
            writer.WriteSerializedValueOrNull("target", value.Target, options);
        }
    }
}