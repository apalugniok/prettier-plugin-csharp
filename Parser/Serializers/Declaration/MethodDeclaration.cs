using System.Linq;
using System.Text.Json;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class MethodDeclarationSerializer: SyntaxNodeSerializer<MethodDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, MethodDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteWhitespaceDetails(value);
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValueOrNull("body", (SyntaxNode) value.Body ?? value.ExpressionBody, options);
            writer.WriteSerializedValueOrNull("typeParameters", value.TypeParameterList, options);
            writer.WriteSerializedValue("constraintClauses", value.ConstraintClauses, options);
            writer.WriteSerializedValue("parameters", value.ParameterList, options);
            writer.WriteSerializedValue("returnType", value.ReturnType, options);
            writer.WriteSerializedValueOrNull("interfaceSpecifier", value.ExplicitInterfaceSpecifier, options);
        }
    }
    
    public class ConstructorDeclarationSerializer: SyntaxNodeSerializer<ConstructorDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ConstructorDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteWhitespaceDetails(value);
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteSerializedValue("name", value.Identifier.ValueText, options);
            writer.WriteSerializedValueOrNull("body", (SyntaxNode) value.Body ?? value.ExpressionBody, options);
            writer.WriteSerializedValue("parameters", value.ParameterList, options);
            writer.WriteSerializedValueOrNull("initializer", value.Initializer, options);
        }
    }
    
    public class DestructorDeclarationSerializer: SyntaxNodeSerializer<DestructorDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, DestructorDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteWhitespaceDetails(value);
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteSerializedValue("name", value.Identifier.ValueText, options);
            writer.WriteSerializedValueOrNull("body", (SyntaxNode) value.Body ?? value.ExpressionBody, options);
            writer.WriteSerializedValue("parameters", value.ParameterList, options);
        }
    }

    public class ConstructorInitializerSerializer : SyntaxNodeSerializer<ConstructorInitializerSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ConstructorInitializerSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("arguments", value.ArgumentList, options);
            writer.WriteString("keyword", value.ThisOrBaseKeyword.ValueText);
        }
    }
}