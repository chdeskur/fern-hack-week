import { TypeConverter } from "./TypeConverter";

describe("TypeConverter", () => {
  describe("convertValue", () => {
    describe("string conversions", () => {
      it("should convert null/undefined to empty string", () => {
        const result1 = TypeConverter.convertValue(null, "string");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe("");

        const result2 = TypeConverter.convertValue(undefined, "string");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe("");
      });

      it("should keep strings as-is", () => {
        const result = TypeConverter.convertValue("hello", "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe("hello");
      });

      it("should convert numbers to strings", () => {
        const result = TypeConverter.convertValue(123, "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe("123");
      });

      it("should convert booleans to strings", () => {
        const result1 = TypeConverter.convertValue(true, "string");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe("true");

        const result2 = TypeConverter.convertValue(false, "string");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe("false");
      });

      it("should convert dates to ISO strings", () => {
        const date = new Date("2023-12-01T00:00:00Z");
        const result = TypeConverter.convertValue(date, "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe("2023-12-01T00:00:00.000Z");
      });

      it("should convert arrays to JSON strings", () => {
        const result = TypeConverter.convertValue([1, 2, 3], "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe("[1,2,3]");
      });

      it("should convert objects to JSON strings", () => {
        const result = TypeConverter.convertValue({ key: "value" }, "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe('{"key":"value"}');
      });

      it("should handle functions gracefully", () => {
        const result = TypeConverter.convertValue(() => {
          // Empty function for testing
        }, "string");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert value of type 'function' to string"
        );
      });
    });

    describe("number conversions", () => {
      it("should reject null/undefined for numbers", () => {
        const result = TypeConverter.convertValue(null, "number");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert null/undefined to number"
        );
      });

      it("should keep numbers as-is", () => {
        const result = TypeConverter.convertValue(42, "number");
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
      });

      it("should convert numeric strings to numbers", () => {
        const result = TypeConverter.convertValue("42", "number");
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
      });

      it("should reject non-numeric strings", () => {
        const result = TypeConverter.convertValue("invalid", "number");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "invalid" cannot be converted to number'
        );
      });

      it("should reject empty strings", () => {
        const result = TypeConverter.convertValue("", "number");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Empty string cannot be converted to number"
        );
      });

      it("should convert booleans to numbers", () => {
        const result1 = TypeConverter.convertValue(true, "number");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe(1);

        const result2 = TypeConverter.convertValue(false, "number");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe(0);
      });

      it("should reject non-convertible types", () => {
        const result = TypeConverter.convertValue({}, "number");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert value of type 'object' to number"
        );
      });
    });

    describe("integer conversions", () => {
      it("should accept integers", () => {
        const result = TypeConverter.convertValue(42, "integer");
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
      });

      it("should accept integer strings", () => {
        const result = TypeConverter.convertValue("42", "integer");
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
      });

      it("should reject floats", () => {
        const result = TypeConverter.convertValue(42.5, "integer");
        expect(result.success).toBe(false);
        expect(result.error).toContain("Value 42.5 is not an integer");
      });

      it("should reject float strings", () => {
        const result = TypeConverter.convertValue("42.5", "integer");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "42.5" cannot be converted to integer'
        );
      });
    });

    describe("unsigned integer conversions", () => {
      it("should accept positive integers", () => {
        const result = TypeConverter.convertValue(42, "uint");
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
      });

      it("should reject negative integers", () => {
        const result = TypeConverter.convertValue(-42, "uint");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Value -42 is negative but uint requires non-negative values"
        );
      });

      it("should reject negative integer strings", () => {
        const result = TypeConverter.convertValue("-42", "uint");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "-42" is negative but uint requires non-negative values'
        );
      });
    });

    describe("boolean conversions", () => {
      it("should convert null/undefined to false", () => {
        const result1 = TypeConverter.convertValue(null, "boolean");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe(false);

        const result2 = TypeConverter.convertValue(undefined, "boolean");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe(false);
      });

      it("should keep booleans as-is", () => {
        const result1 = TypeConverter.convertValue(true, "boolean");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe(true);

        const result2 = TypeConverter.convertValue(false, "boolean");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe(false);
      });

      it("should convert truthy strings", () => {
        const truthyStrings = ["true", "1", "yes", "on"];
        truthyStrings.forEach((str) => {
          const result = TypeConverter.convertValue(str, "boolean");
          expect(result.success).toBe(true);
          expect(result.value).toBe(true);
        });
      });

      it("should convert falsy strings", () => {
        const falsyStrings = ["false", "0", "no", "off", ""];
        falsyStrings.forEach((str) => {
          const result = TypeConverter.convertValue(str, "boolean");
          expect(result.success).toBe(true);
          expect(result.value).toBe(false);
        });
      });

      it("should reject invalid boolean strings", () => {
        const result = TypeConverter.convertValue("maybe", "boolean");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "maybe" cannot be converted to boolean'
        );
        expect(result.error).toContain(
          'Use "true"/"false", "1"/"0", "yes"/"no", or "on"/"off"'
        );
      });

      it("should convert numbers to booleans", () => {
        const result1 = TypeConverter.convertValue(1, "boolean");
        expect(result1.success).toBe(false);
        expect(result1.error).toContain(
          "Cannot convert value of type 'number' to boolean"
        );

        const result2 = TypeConverter.convertValue(0, "boolean");
        expect(result2.success).toBe(false);
        expect(result2.error).toContain(
          "Cannot convert value of type 'number' to boolean"
        );
      });

      it("should reject non-convertible types", () => {
        const result = TypeConverter.convertValue({}, "boolean");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert value of type 'object' to boolean"
        );
      });
    });

    describe("date conversions", () => {
      it("should reject null/undefined for dates", () => {
        const result = TypeConverter.convertValue(null, "date");
        expect(result.success).toBe(false);
        expect(result.error).toContain("Cannot convert null/undefined to date");
      });

      it("should keep Date objects as-is", () => {
        const date = new Date("2023-12-01");
        const result = TypeConverter.convertValue(date, "date");
        expect(result.success).toBe(true);
        expect(result.value).toBe(date);
      });

      it("should convert valid date strings", () => {
        const result = TypeConverter.convertValue("2023-12-01", "date");
        expect(result.success).toBe(true);
        expect(result.value).toBeInstanceOf(Date);
        expect((result.value as Date).toISOString()).toContain("2023-12-01");
      });

      it("should reject invalid date strings", () => {
        const result = TypeConverter.convertValue("invalid-date", "date");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "invalid-date" cannot be converted to date'
        );
      });

      it("should reject empty strings", () => {
        const result = TypeConverter.convertValue("", "date");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Empty string cannot be converted to date"
        );
      });

      it("should convert timestamps", () => {
        const timestamp = 1701388800000; // 2023-12-01
        const result = TypeConverter.convertValue(timestamp, "date");
        expect(result.success).toBe(true);
        expect(result.value).toBeInstanceOf(Date);
      });

      it("should reject invalid timestamps", () => {
        const result = TypeConverter.convertValue(NaN, "date");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Number NaN cannot be converted to valid date"
        );
      });

      it("should reject non-convertible types", () => {
        const result = TypeConverter.convertValue({}, "date");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert value of type 'object' to date"
        );
      });
    });

    describe("array conversions", () => {
      it("should convert null/undefined to empty array", () => {
        const result1 = TypeConverter.convertValue(null, "array");
        expect(result1.success).toBe(true);
        expect(result1.value).toEqual([]);

        const result2 = TypeConverter.convertValue(undefined, "array");
        expect(result2.success).toBe(true);
        expect(result2.value).toEqual([]);
      });

      it("should keep arrays as-is", () => {
        const result = TypeConverter.convertValue([1, 2, 3], "array");
        expect(result.success).toBe(true);
        expect(result.value).toEqual([1, 2, 3]);
      });

      it("should parse JSON array strings", () => {
        const result = TypeConverter.convertValue("[1,2,3]", "array");
        expect(result.success).toBe(true);
        expect(result.value).toEqual([1, 2, 3]);
      });

      it("should split comma-separated strings", () => {
        const result = TypeConverter.convertValue("a,b,c", "array");
        expect(result.success).toBe(true);
        expect(result.value).toEqual(["a", "b", "c"]);
      });

      it("should handle single values", () => {
        const result = TypeConverter.convertValue("single", "array");
        expect(result.success).toBe(true);
        expect(result.value).toEqual(["single"]);
      });

      it("should handle numbers", () => {
        const result = TypeConverter.convertValue(42, "array");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert value of type 'number' to array"
        );
      });
    });

    describe("object conversions", () => {
      it("should convert null/undefined to empty object", () => {
        const result1 = TypeConverter.convertValue(null, "object");
        expect(result1.success).toBe(true);
        expect(result1.value).toEqual({});

        const result2 = TypeConverter.convertValue(undefined, "object");
        expect(result2.success).toBe(true);
        expect(result2.value).toEqual({});
      });

      it("should keep objects as-is", () => {
        const obj = { key: "value" };
        const result = TypeConverter.convertValue(obj, "object");
        expect(result.success).toBe(true);
        expect(result.value).toBe(obj);
      });

      it("should parse JSON object strings", () => {
        const result = TypeConverter.convertValue('{"key":"value"}', "object");
        expect(result.success).toBe(true);
        expect(result.value).toEqual({ key: "value" });
      });

      it("should reject invalid JSON strings", () => {
        const result = TypeConverter.convertValue('{"invalid json', "object");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "{"invalid json" cannot be parsed as JSON object'
        );
      });

      it("should reject arrays", () => {
        const result = TypeConverter.convertValue([1, 2, 3], "object");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          "Cannot convert value of type 'object' to object"
        );
      });

      it("should reject non-object types", () => {
        const result = TypeConverter.convertValue("string", "object");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "string" cannot be parsed as JSON object'
        );
      });
    });

    describe("union conversions", () => {
      it("should reject invalid union definitions", () => {
        const result = TypeConverter.convertValue("test", "union");
        expect(result.success).toBe(false);
        expect(result.error).toBe("Invalid union type definition");
      });

      it("should try each union member", () => {
        const unionShape = {
          union: [{ type: "string" }, { type: "number" }],
        };
        const result = TypeConverter.convertValue("test", "union", unionShape);
        expect(result.success).toBe(true);
        expect(result.value).toBe("test");
      });

      it("should fail if no union member matches", () => {
        const unionShape = {
          union: [{ type: "number" }, { type: "boolean" }],
        };
        const result = TypeConverter.convertValue(
          "not-a-number",
          "union",
          unionShape
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe(
          "Value does not match any union member types"
        );
      });
    });

    describe("unknown/reference type handling", () => {
      it("should treat unknown types as strings", () => {
        const result = TypeConverter.convertValue(123, "unknown");
        expect(result.success).toBe(true);
        expect(result.value).toBe("123");
      });

      it("should treat reference types as strings", () => {
        const result = TypeConverter.convertValue(123, "reference");
        expect(result.success).toBe(true);
        expect(result.value).toBe("123");
      });

      it("should treat any unknown type as string", () => {
        const result = TypeConverter.convertValue(123, "some-unknown-type");
        expect(result.success).toBe(true);
        expect(result.value).toBe("123");
      });
    });

    describe("context handling", () => {
      it("should include context in error messages", () => {
        const result = TypeConverter.convertValue(
          "invalid",
          "number",
          undefined,
          "test parameter"
        );
        expect(result.success).toBe(false);
        expect(result.error).toContain(" for test parameter");
      });

      it("should handle empty context", () => {
        const result = TypeConverter.convertValue("invalid", "number");
        expect(result.success).toBe(false);
        expect(result.error).not.toContain(" for ");
      });
    });

    describe("error handling", () => {
      it("should catch and handle exceptions", () => {
        // Mock a function that throws an error
        const originalJSON = JSON.parse;
        JSON.parse = function () {
          throw new Error("Test error");
        } as typeof JSON.parse;

        const result = TypeConverter.convertValue("test", "object");
        expect(result.success).toBe(false);
        expect(result.error).toContain(
          'String "test" cannot be parsed as JSON object'
        );

        // Restore original
        JSON.parse = originalJSON;
      });
    });

    describe("optional and nullable type handling", () => {
      it("should allow null values for optional types", () => {
        const optionalShape = { type: "optional", shape: { type: "string" } };
        const result = TypeConverter.convertValue(
          null,
          "string",
          optionalShape
        );
        expect(result.success).toBe(true);
        expect(result.value).toBe(null);
        expect(result.warnings).toContain(
          "Optional parameter set to null - this is allowed"
        );
      });

      it("should allow null values for nullable types", () => {
        const nullableShape = { type: "nullable", shape: { type: "string" } };
        const result = TypeConverter.convertValue(
          null,
          "string",
          nullableShape
        );
        expect(result.success).toBe(true);
        expect(result.value).toBe(null);
        expect(result.warnings).toContain(
          "Nullable parameter set to null - this is allowed"
        );
      });

      it("should convert non-null values for optional types using the underlying shape", () => {
        const optionalShape = { type: "optional", shape: { type: "string" } };
        const result = TypeConverter.convertValue(
          "test",
          "string",
          optionalShape
        );
        expect(result.success).toBe(true);
        expect(result.value).toBe("test");
      });

      it("should convert non-null values for nullable types using the underlying shape", () => {
        const nullableShape = { type: "nullable", shape: { type: "number" } };
        const result = TypeConverter.convertValue(
          "42",
          "number",
          nullableShape
        );
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
      });

      it("should reject null values for required types", () => {
        const result = TypeConverter.convertValue(null, "number");
        expect(result.success).toBe(false);
        expect(result.error).toContain("This parameter is required");
      });

      it("should reject null values for required date types", () => {
        const result = TypeConverter.convertValue(null, "date");
        expect(result.success).toBe(false);
        expect(result.error).toContain("This parameter is required");
      });

      it("should handle nested optional types", () => {
        const nestedOptionalShape = {
          type: "optional",
          shape: {
            type: "nullable",
            shape: { type: "string" },
          },
        };
        const result = TypeConverter.convertValue(
          null,
          "string",
          nestedOptionalShape
        );
        expect(result.success).toBe(true);
        expect(result.value).toBe(null);
        expect(result.warnings).toContain(
          "Optional parameter set to null - this is allowed"
        );
      });
    });
  });

  describe("edge cases", () => {
    it("should handle NaN values", () => {
      const result = TypeConverter.convertValue("NaN", "number");
      expect(result.success).toBe(false);
      expect(result.error).toContain(
        'String "NaN" cannot be converted to number'
      );
    });

    it("should handle Infinity values", () => {
      const result = TypeConverter.convertValue(Infinity, "string");
      expect(result.success).toBe(true);
      expect(result.value).toBe("Infinity");
    });

    it("should handle empty arrays", () => {
      const result = TypeConverter.convertValue([], "array");
      expect(result.success).toBe(true);
      expect(result.value).toEqual([]);
    });

    it("should handle empty objects", () => {
      const result = TypeConverter.convertValue({}, "object");
      expect(result.success).toBe(true);
      expect(result.value).toEqual({});
    });

    it("should handle whitespace-only strings", () => {
      const result = TypeConverter.convertValue("   ", "string");
      expect(result.success).toBe(true);
      expect(result.value).toBe("   ");
    });

    it("should handle whitespace-only strings for numbers", () => {
      const result = TypeConverter.convertValue("   ", "number");
      expect(result.success).toBe(false);
      expect(result.error).toContain(
        "Empty string cannot be converted to number"
      );
    });
  });

  describe("type aliases", () => {
    it("should handle datetime as date", () => {
      const result = TypeConverter.convertValue("2023-12-01", "datetime");
      expect(result.success).toBe(true);
      expect(result.value).toBeInstanceOf(Date);
    });

    it("should handle list as array", () => {
      const result = TypeConverter.convertValue("a,b,c", "list");
      expect(result.success).toBe(true);
      expect(result.value).toEqual(["a", "b", "c"]);
    });

    it("should handle set as array", () => {
      const result = TypeConverter.convertValue("a,b,c", "set");
      expect(result.success).toBe(true);
      expect(result.value).toEqual(["a", "b", "c"]);
    });

    it("should handle map as object", () => {
      const result = TypeConverter.convertValue('{"key":"value"}', "map");
      expect(result.success).toBe(true);
      expect(result.value).toEqual({ key: "value" });
    });

    it("should handle float as number", () => {
      const result = TypeConverter.convertValue("3.14", "float");
      expect(result.success).toBe(true);
      expect(result.value).toBe(3.14);
    });

    it("should handle long as integer", () => {
      const result = TypeConverter.convertValue("42", "long");
      expect(result.success).toBe(true);
      expect(result.value).toBe(42);
    });

    it("should handle uint64 as unsigned integer", () => {
      const result = TypeConverter.convertValue("42", "uint64");
      expect(result.success).toBe(true);
      expect(result.value).toBe(42);
    });
  });

  describe("warning functionality", () => {
    describe("null/undefined coercion warnings", () => {
      it("should warn when coercing null/undefined to empty string", () => {
        const result1 = TypeConverter.convertValue(null, "string");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe("");
        expect(result1.warnings).toEqual([
          "null/undefined value coerced to empty string",
        ]);

        const result2 = TypeConverter.convertValue(undefined, "string");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe("");
        expect(result2.warnings).toEqual([
          "null/undefined value coerced to empty string",
        ]);
      });

      it("should warn when coercing null/undefined to false", () => {
        const result1 = TypeConverter.convertValue(null, "boolean");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe(false);
        expect(result1.warnings).toEqual([
          "null/undefined value coerced to false",
        ]);

        const result2 = TypeConverter.convertValue(undefined, "boolean");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe(false);
        expect(result2.warnings).toEqual([
          "null/undefined value coerced to false",
        ]);
      });

      it("should warn when coercing null/undefined to empty array", () => {
        const result1 = TypeConverter.convertValue(null, "array");
        expect(result1.success).toBe(true);
        expect(result1.value).toEqual([]);
        expect(result1.warnings).toEqual([
          "null/undefined value coerced to empty array",
        ]);

        const result2 = TypeConverter.convertValue(undefined, "array");
        expect(result2.success).toBe(true);
        expect(result2.value).toEqual([]);
        expect(result2.warnings).toEqual([
          "null/undefined value coerced to empty array",
        ]);
      });

      it("should warn when coercing null/undefined to empty object", () => {
        const result1 = TypeConverter.convertValue(null, "object");
        expect(result1.success).toBe(true);
        expect(result1.value).toEqual({});
        expect(result1.warnings).toEqual([
          "null/undefined value coerced to empty object",
        ]);

        const result2 = TypeConverter.convertValue(undefined, "object");
        expect(result2.success).toBe(true);
        expect(result2.value).toEqual({});
        expect(result2.warnings).toEqual([
          "null/undefined value coerced to empty object",
        ]);
      });
    });

    describe("boolean to number coercion warnings", () => {
      it("should warn when coercing booleans to numbers", () => {
        const result1 = TypeConverter.convertValue(true, "number");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe(1);
        expect(result1.warnings).toEqual(["boolean true coerced to number 1"]);

        const result2 = TypeConverter.convertValue(false, "number");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe(0);
        expect(result2.warnings).toEqual(["boolean false coerced to number 0"]);
      });
    });

    describe("no warnings for direct conversions", () => {
      it("should not warn for direct string conversions", () => {
        const result = TypeConverter.convertValue("hello", "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe("hello");
        expect(result.warnings).toBeUndefined();
      });

      it("should not warn for direct number conversions", () => {
        const result = TypeConverter.convertValue(42, "number");
        expect(result.success).toBe(true);
        expect(result.value).toBe(42);
        expect(result.warnings).toBeUndefined();
      });

      it("should not warn for direct boolean conversions", () => {
        const result1 = TypeConverter.convertValue(true, "boolean");
        expect(result1.success).toBe(true);
        expect(result1.value).toBe(true);
        expect(result1.warnings).toBeUndefined();

        const result2 = TypeConverter.convertValue(false, "boolean");
        expect(result2.success).toBe(true);
        expect(result2.value).toBe(false);
        expect(result2.warnings).toBeUndefined();
      });

      it("should not warn for direct array conversions", () => {
        const result = TypeConverter.convertValue([1, 2, 3], "array");
        expect(result.success).toBe(true);
        expect(result.value).toEqual([1, 2, 3]);
        expect(result.warnings).toBeUndefined();
      });

      it("should not warn for direct object conversions", () => {
        const obj = { key: "value" };
        const result = TypeConverter.convertValue(obj, "object");
        expect(result.success).toBe(true);
        expect(result.value).toBe(obj);
        expect(result.warnings).toBeUndefined();
      });
    });

    describe("warning message format", () => {
      it("should provide descriptive warning messages", () => {
        const result = TypeConverter.convertValue(null, "string");
        expect(result.success).toBe(true);
        expect(result.value).toBe("");
        expect(result.warnings?.[0]).toContain("null/undefined");
        expect(result.warnings?.[0]).toContain("coerced");
        expect(result.warnings?.[0]).toContain("empty string");
      });
    });
  });
});
