using System.Linq;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class PropertyDeclarationSerializer: SyntaxNodeSerializer<PropertyDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, PropertyDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValue("propertyType", value.Type, options);
            writer.WriteSerializedValueOrNull("accessors", value.AccessorList, options);
            writer.WriteSerializedValueOrNull("expressionBody", value.ExpressionBody, options);
            writer.WriteSerializedValueOrNull("initializer", value.Initializer, options);
            writer.WriteSerializedValueOrNull("interfaceSpecifier", value.ExplicitInterfaceSpecifier, options);
        }
    }
    
    public class EventDeclarationSerializer: SyntaxNodeSerializer<EventDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, EventDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValue("propertyType", value.Type, options);
            writer.WriteSerializedValueOrNull("accessors", value.AccessorList, options);
            writer.WriteSerializedValueOrNull("interfaceSpecifier", value.ExplicitInterfaceSpecifier, options);
        }
    } 
    
    public class IndexerDeclarationSerializer: SyntaxNodeSerializer<IndexerDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, IndexerDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteSerializedValue("parameters", value.ParameterList, options);
            writer.WriteSerializedValue("propertyType", value.Type, options);
            writer.WriteSerializedValueOrNull("accessors", value.AccessorList, options);
            writer.WriteSerializedValueOrNull("interfaceSpecifier", value.ExplicitInterfaceSpecifier, options);
        }
    }

    public class AccessorListSerializer : SyntaxNodeSerializer<AccessorListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AccessorListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("accessors", value.Accessors, options);
            
        }
    }
    
    public class AccessorDeclarationSerializer : SyntaxNodeSerializer<AccessorDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AccessorDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteString("keyword", value.Keyword.ValueText);
            writer.WriteSerializedValueOrNull("body", (object) value.Body ?? value.ExpressionBody, options);
        }
    }
}