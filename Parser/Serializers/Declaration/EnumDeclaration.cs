using System.Linq;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class EnumDeclarationSerializer: SyntaxNodeSerializer<EnumDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, EnumDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteWhitespaceDetails(value);
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValue("members", value.Members, options);
        }
    }

    public class EnumMemberDeclarationSerializer : SyntaxNodeSerializer<EnumMemberDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, EnumMemberDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteWhitespaceDetails(value);
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValueOrNull("equalsValue", value.EqualsValue, options);
        }
    }
}