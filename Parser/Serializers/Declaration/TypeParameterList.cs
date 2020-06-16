using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class TypeParameterListSerializer: SyntaxNodeSerializer<TypeParameterListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, TypeParameterListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("parameters", value.Parameters, options);
        }
    }
}