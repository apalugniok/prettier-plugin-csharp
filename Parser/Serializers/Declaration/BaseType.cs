using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class BaseListSerializer: SyntaxNodeSerializer<BaseListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, BaseListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("types", value.Types, options);
        }
    }
    
    public class BaseTypeSerializer: SyntaxNodeSerializer<SimpleBaseTypeSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, SimpleBaseTypeSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("baseType", value.Type, options);
        }
    }
}