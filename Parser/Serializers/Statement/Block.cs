using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Statement
{
    public class BlockSerializer: SyntaxNodeSerializer<BlockSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, BlockSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("statements", value.Statements, options);
        }
    }
}