using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class NamespaceDeclarationSerializer : SyntaxNodeSerializer<NamespaceDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, NamespaceDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("name", value.Name, options);
            writer.WriteSerializedValue("usings", value.Usings, options);
            writer.WriteSerializedValue("externs", value.Externs, options);
            writer.WriteSerializedValue("members", value.Members, options);
        }
    }
}