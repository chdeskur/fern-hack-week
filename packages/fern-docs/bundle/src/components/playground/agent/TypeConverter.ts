/**
 * Type-Safe Parameter Setting System
 *
 * This system provides automatic type conversion and validation for all playground parameters.
 * Each parameter is associated with a specific data type, and the system attempts to convert
 * incoming values to the correct type. If conversion fails, helpful error messages are provided.
 */

// Type conversion result interface
export interface TypeConversionResult {
  success: boolean;
  value?: unknown;
  error?: string;
  warnings?: string[];
  originalValue: unknown;
  targetType: string;
}

// Comprehensive type converter class
export class TypeConverter {
  /**
   * Converts a value to the specified type with validation and helpful error messages
   */
  static convertValue(
    value: unknown,
    targetType: string,
    typeShape?: any,
    context?: string
  ): TypeConversionResult {
    const contextStr = context ? ` for ${context}` : "";

    // Check if this is an optional type
    const isOptional = typeShape?.type === "optional";
    const isNullable = typeShape?.type === "nullable";

    // If the value is null/undefined and the type is optional, allow it
    if ((isOptional || isNullable) && value == null) {
      return {
        success: true,
        value: null,
        originalValue: value,
        targetType,
        warnings: isOptional
          ? ["Optional parameter set to null - this is allowed"]
          : ["Nullable parameter set to null - this is allowed"],
      };
    }

    // For optional types, we need to convert the underlying shape
    if (isOptional && typeShape?.shape) {
      return this.convertValue(value, targetType, typeShape.shape, context);
    }

    // For nullable types, we need to convert the underlying shape
    if (isNullable && typeShape?.shape) {
      return this.convertValue(value, targetType, typeShape.shape, context);
    }

    try {
      switch (targetType) {
        case "string":
          return this.convertToString(value, contextStr);
        case "number":
        case "integer":
        case "long":
        case "double":
        case "float":
        case "uint":
        case "uint64":
          return this.convertToNumber(value, targetType, contextStr);
        case "boolean":
          return this.convertToBoolean(value, contextStr);
        case "date":
        case "datetime":
          return this.convertToDate(value, contextStr);
        case "array":
        case "list":
        case "set":
          return this.convertToArray(value, typeShape, contextStr);
        case "object":
        case "map":
          return this.convertToObject(value, contextStr);
        case "union":
          return this.convertToUnion(value, typeShape, contextStr);
        case "unknown":
        case "reference":
          // Treat unknown/reference types as strings for compatibility
          return this.convertToString(value, contextStr);
        default:
          // For any other unknown type, try to convert to string as a fallback
          return this.convertToString(value, contextStr);
      }
    } catch (error) {
      return {
        success: false,
        originalValue: value,
        targetType,
        error: `Type conversion error${contextStr}: ${error instanceof Error ? error.message : String(error)}`,
        warnings: [
          `Unexpected error during type conversion: ${error instanceof Error ? error.message : String(error)}`,
        ],
      };
    }
  }

  private static convertToString(
    value: unknown,
    context: string
  ): TypeConversionResult {
    if (value == null) {
      return {
        success: true,
        value: "",
        originalValue: value,
        targetType: "string",
        warnings: ["null/undefined value coerced to empty string"],
      };
    }

    if (typeof value === "string") {
      return {
        success: true,
        value,
        originalValue: value,
        targetType: "string",
      };
    }

    if (typeof value === "number") {
      return {
        success: true,
        value: String(value),
        originalValue: value,
        targetType: "string",
      };
    }

    if (typeof value === "boolean") {
      return {
        success: true,
        value: String(value),
        originalValue: value,
        targetType: "string",
      };
    }

    if (value instanceof Date) {
      return {
        success: true,
        value: value.toISOString(),
        originalValue: value,
        targetType: "string",
      };
    }

    if (Array.isArray(value)) {
      return {
        success: true,
        value: JSON.stringify(value),
        originalValue: value,
        targetType: "string",
      };
    }

    if (typeof value === "object") {
      return {
        success: true,
        value: JSON.stringify(value),
        originalValue: value,
        targetType: "string",
      };
    }

    return {
      success: false,
      originalValue: value,
      targetType: "string",
      error: `Cannot convert value of type '${typeof value}' to string${context}`,
    };
  }

  private static convertToNumber(
    value: unknown,
    targetType: string,
    context: string
  ): TypeConversionResult {
    if (value == null) {
      return {
        success: false,
        originalValue: value,
        targetType,
        error: `Cannot convert null/undefined to ${targetType}${context}. This parameter is required.`,
      };
    }

    if (typeof value === "number") {
      // Validate integer types
      if (
        targetType === "integer" ||
        targetType === "long" ||
        targetType === "uint" ||
        targetType === "uint64"
      ) {
        if (!Number.isInteger(value)) {
          return {
            success: false,
            originalValue: value,
            targetType,
            error: `Value ${value} is not an integer${context}`,
          };
        }

        // Validate unsigned types
        if ((targetType === "uint" || targetType === "uint64") && value < 0) {
          return {
            success: false,
            originalValue: value,
            targetType,
            error: `Value ${value} is negative but ${targetType} requires non-negative values${context}`,
          };
        }
      }

      return {
        success: true,
        value,
        originalValue: value,
        targetType,
      };
    }

    if (typeof value === "string") {
      const trimmed = value.trim();

      // Handle empty string
      if (trimmed === "") {
        return {
          success: false,
          originalValue: value,
          targetType,
          error: `Empty string cannot be converted to ${targetType}${context}`,
        };
      }

      // Try to parse as number
      const num = Number(trimmed);
      if (isNaN(num)) {
        return {
          success: false,
          originalValue: value,
          targetType,
          error: `String "${value}" cannot be converted to ${targetType}${context}`,
        };
      }

      // Validate integer types
      if (
        targetType === "integer" ||
        targetType === "long" ||
        targetType === "uint" ||
        targetType === "uint64"
      ) {
        if (!Number.isInteger(num)) {
          return {
            success: false,
            originalValue: value,
            targetType,
            error: `String "${value}" cannot be converted to integer${context}`,
          };
        }

        // Validate unsigned types
        if ((targetType === "uint" || targetType === "uint64") && num < 0) {
          return {
            success: false,
            originalValue: value,
            targetType,
            error: `String "${value}" is negative but ${targetType} requires non-negative values${context}`,
          };
        }
      }

      return {
        success: true,
        value: num,
        originalValue: value,
        targetType,
      };
    }

    if (typeof value === "boolean") {
      return {
        success: true,
        value: value ? 1 : 0,
        originalValue: value,
        targetType,
        warnings: [`boolean ${value} coerced to number ${value ? 1 : 0}`],
      };
    }

    return {
      success: false,
      originalValue: value,
      targetType,
      error: `Cannot convert value of type '${typeof value}' to ${targetType}${context}`,
    };
  }

  private static convertToBoolean(
    value: unknown,
    context: string
  ): TypeConversionResult {
    if (value == null) {
      return {
        success: true,
        value: false,
        originalValue: value,
        targetType: "boolean",
        warnings: ["null/undefined value coerced to false"],
      };
    }

    if (typeof value === "boolean") {
      return {
        success: true,
        value,
        originalValue: value,
        targetType: "boolean",
      };
    }

    if (typeof value === "string") {
      const lower = value.toLowerCase().trim();
      if (
        lower === "true" ||
        lower === "1" ||
        lower === "yes" ||
        lower === "on"
      ) {
        return {
          success: true,
          value: true,
          originalValue: value,
          targetType: "boolean",
        };
      }
      if (
        lower === "false" ||
        lower === "0" ||
        lower === "no" ||
        lower === "off" ||
        lower === ""
      ) {
        return {
          success: true,
          value: false,
          originalValue: value,
          targetType: "boolean",
        };
      }
      return {
        success: false,
        originalValue: value,
        targetType: "boolean",
        error: `String "${value}" cannot be converted to boolean${context}. Use "true"/"false", "1"/"0", "yes"/"no", or "on"/"off"`,
      };
    }

    if (typeof value === "number") {
      return {
        success: false,
        originalValue: value,
        targetType: "boolean",
        error: `Cannot convert value of type 'number' to boolean${context}`,
      };
    }

    return {
      success: false,
      originalValue: value,
      targetType: "boolean",
      error: `Cannot convert value of type '${typeof value}' to boolean${context}`,
    };
  }

  private static convertToDate(
    value: unknown,
    context: string
  ): TypeConversionResult {
    if (value == null) {
      return {
        success: false,
        originalValue: value,
        targetType: "date",
        error: `Cannot convert null/undefined to date${context}. This parameter is required.`,
      };
    }

    if (value instanceof Date) {
      return {
        success: true,
        value,
        originalValue: value,
        targetType: "date",
      };
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") {
        return {
          success: false,
          originalValue: value,
          targetType: "date",
          error: `Empty string cannot be converted to date${context}`,
        };
      }

      const date = new Date(trimmed);
      if (isNaN(date.getTime())) {
        return {
          success: false,
          originalValue: value,
          targetType: "date",
          error: `String "${value}" cannot be converted to date${context}. Use ISO format (YYYY-MM-DD) or other valid date format`,
        };
      }

      return {
        success: true,
        value: date,
        originalValue: value,
        targetType: "date",
      };
    }

    if (typeof value === "number") {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return {
          success: false,
          originalValue: value,
          targetType: "date",
          error: `Number ${value} cannot be converted to valid date${context}`,
        };
      }

      return {
        success: true,
        value: date,
        originalValue: value,
        targetType: "date",
      };
    }

    return {
      success: false,
      originalValue: value,
      targetType: "date",
      error: `Cannot convert value of type '${typeof value}' to date${context}`,
    };
  }

  private static convertToArray(
    value: unknown,
    _typeShape: any,
    _context: string
  ): TypeConversionResult {
    if (value == null) {
      return {
        success: true,
        value: [],
        originalValue: value,
        targetType: "array",
        warnings: ["null/undefined value coerced to empty array"],
      };
    }

    if (Array.isArray(value)) {
      return {
        success: true,
        value,
        originalValue: value,
        targetType: "array",
      };
    }

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return {
            success: true,
            value: parsed,
            originalValue: value,
            targetType: "array",
          };
        }
      } catch {
        // Try to split by comma
        const items = value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");
        return {
          success: true,
          value: items,
          originalValue: value,
          targetType: "array",
        };
      }
    }

    // Convert single value to array
    return {
      success: false,
      originalValue: value,
      targetType: "array",
      error: `Cannot convert value of type '${typeof value}' to array`,
    };
  }

  private static convertToObject(
    value: unknown,
    _context: string
  ): TypeConversionResult {
    if (value == null) {
      return {
        success: true,
        value: {},
        originalValue: value,
        targetType: "object",
        warnings: ["null/undefined value coerced to empty object"],
      };
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      return {
        success: true,
        value,
        originalValue: value,
        targetType: "object",
      };
    }

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed === "object" && !Array.isArray(parsed)) {
          return {
            success: true,
            value: parsed,
            originalValue: value,
            targetType: "object",
          };
        }
      } catch {
        return {
          success: false,
          originalValue: value,
          targetType: "object",
          error: `String "${value}" cannot be parsed as JSON object`,
        };
      }
    }

    return {
      success: false,
      originalValue: value,
      targetType: "object",
      error: `Cannot convert value of type '${typeof value}' to object`,
    };
  }

  private static convertToUnion(
    value: unknown,
    typeShape: any,
    _context: string
  ): TypeConversionResult {
    if (!typeShape?.union) {
      return {
        success: false,
        originalValue: value,
        targetType: "union",
        error: "Invalid union type definition",
      };
    }

    // Try to match against each union member
    for (const member of typeShape.union) {
      // For simplicity, we'll assume member has a type property
      const memberType =
        typeof member === "object" && member != null
          ? member.type || "string"
          : "string";
      const conversion = this.convertValue(value, memberType, member, "");
      if (conversion.success) {
        return conversion;
      }
    }

    return {
      success: false,
      originalValue: value,
      targetType: "union",
      error: "Value does not match any union member types",
    };
  }
}
