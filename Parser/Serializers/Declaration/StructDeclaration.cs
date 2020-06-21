﻿using System.Linq;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class StructDeclarationSerializer: SyntaxNodeSerializer<StructDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, StructDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("attributeLists", value.AttributeLists, options);
            writer.WriteSerializedValue("modifiers", value.Modifiers.Select(m => m.ValueText), options);
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValueOrNull("typeParameters", value.TypeParameterList, options);
            writer.WriteSerializedValueOrNull("bases", value.BaseList, options);
            writer.WriteSerializedValue("constraintClauses", value.ConstraintClauses, options);
            writer.WriteSerializedValue("members", value.Members, options);
        }
    }
}