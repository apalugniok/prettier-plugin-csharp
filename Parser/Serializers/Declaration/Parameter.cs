using System.Linq;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class BracketedParameterListSerializer: SyntaxNodeSerializer<BracketedParameterListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, BracketedParameterListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("parameters", value.Parameters, options);
        }
    }
    
    public class ParameterListSerializer: SyntaxNodeSerializer<ParameterListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ParameterListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("parameters", value.Parameters, options);
        }
    }
    
    public class ParameterSerializer: SyntaxNodeSerializer<ParameterSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ParameterSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValueOrNull("defaultValue", value.Default, options);
            writer.WriteSerializedValueOrNull("parameterType", value.Type, options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
        }
    }
    
    public class TypeParameterListSerializer: SyntaxNodeSerializer<TypeParameterListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, TypeParameterListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("parameters", value.Parameters, options);
        }
    }
    
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