import { validateCommandLineInputs } from "../validateInputs";

describe("Test Validating Command Line Inputs", () => {
  test("Not valid if no enough arguments", () => {
    const args = ["exe", "path"]; // default stuff
    const result = validateCommandLineInputs(args);
    expect(result.isValid).toBe(false);
  });

  test("Message if no enough arguments", () => {
    const args = ["exe", "path"]; // default stuff
    const result = validateCommandLineInputs(args);
    expect(result.errors).not.toBe(null);
    expect(result.errors[0]).toBe("Not enough arguments provided");
  });


  test("Should be valid if the arguments are sufficient", () => {
    const args = ["exe", "path", "component"]; // default stuff
    const result = validateCommandLineInputs(args);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});
