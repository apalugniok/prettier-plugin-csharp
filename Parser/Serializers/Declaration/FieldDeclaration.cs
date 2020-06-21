using System.Linq;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class FieldDeclarationSerializer: SyntaxNodeSerializer<FieldDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, FieldDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("declaration", value.Declaration, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
        }
    }
    
    public class EventFieldDeclarationSerializer: SyntaxNodeSerializer<EventFieldDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, EventFieldDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("declaration", value.Declaration, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
        }
    }
}