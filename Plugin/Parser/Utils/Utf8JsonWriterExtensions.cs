using System.Collections.Generic;
using System.Text.Json;

namespace Plugin.Parser.Utils
{
    public static class Utf8JsonWriterExtensions
    {
        public static void WriteSerializedValueOrNull(
            this Utf8JsonWriter writer,
            string propertyName,
            object value,
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

        private static void WriteSerializedValue(
            this Utf8JsonWriter writer,
            string propertyName,
            object value,
            JsonSerializerOptions options
        )
        {
            writer.WritePropertyName(propertyName);

            switch (value)
            {
                case IEnumerable<dynamic> enumerable:
                    JsonSerializer.Serialize(writer, enumerable, options);
                    break;
                default:
                    JsonSerializer.Serialize(writer, value, options);
                    break;
            }
        }
    }
}