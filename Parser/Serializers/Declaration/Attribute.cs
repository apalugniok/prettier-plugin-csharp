using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class AttributeListSerializer: SyntaxNodeSerializer<AttributeListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributes", value.Attributes, options);
            writer.WriteSerializedValueOrNull("target", value.Target, options);
        }
    }
    
    public class AttributeTargetSpecifierSerializer: SyntaxNodeSerializer<AttributeTargetSpecifierSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeTargetSpecifierSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("target", value.Identifier.ValueText);
        }
    }
    
    public class AttributeSerializer: SyntaxNodeSerializer<AttributeSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("name", value.Name, options);
            writer.WriteSerializedValueOrNull("arguments", value.ArgumentList, options);
        }
    }
    
    public class AttributeArgumentListSerializer: SyntaxNodeSerializer<AttributeArgumentListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeArgumentListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("arguments", value.Arguments, options);
        }
    }
    
    public class AttributeArgumentSerializer: SyntaxNodeSerializer<AttributeArgumentSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeArgumentSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValueOrNull("nameColon", value.NameColon, options);
            writer.WriteSerializedValueOrNull("nameEquals", value.NameEquals, options);
            writer.WriteSerializedValue("expression", value.Expression, options);
        }
    }
}