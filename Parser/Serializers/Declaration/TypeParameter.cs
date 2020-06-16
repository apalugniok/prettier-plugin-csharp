using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class TypeParameterSerializer: SyntaxNodeSerializer<TypeParameterSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, TypeParameterSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteString("variance", value.VarianceKeyword.ValueText);
            writer.WriteString("name", value.Identifier.ValueText);
        }
    }
}