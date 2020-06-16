using System.Collections;
using System.Collections.Generic;
using System.Text.Json;

namespace PrettierCSharpPlugin.Parser.Utils
{
    public static class Utf8JsonWriterExtensions
    {
        public static void WriteSerializedValueOrNull<T>(
            this Utf8JsonWriter writer,
            string propertyName,
            T value,
            JsonSerializerOptions options
        )
        {
            if (value != null)
            {
                writer.WriteSerializedValue(propertyName, value, options);
            }
            else
            {
                writer.WriteNull(propertyName);
            }
        }
        
        public static void WriteSerializedValue<T>(
            this Utf8JsonWriter writer,
            string propertyName,
            T value,
            JsonSerializerOptions options
        )
        {
            writer.WritePropertyName(propertyName);
            
            if (typeof(IEnumerable).IsAssignableFrom(typeof(T)))
            {
                JsonSerializer.Serialize(writer, (IEnumerable<dynamic>) value, options);
            }
            else
            {
                JsonSerializer.Serialize(writer, (dynamic) value, options);
            }
        }
    }
}