const dayArg = process.argv[2];
const partArg = process.argv[3] ?? "1";

function exitWithMessage(message: string) {
  console.error(message);
  process.exit(1);
}

function validateFirstArg(arg: string | undefined): string | void {
  const invalidMessage = `Invalid argument "${arg}". First argument must be a number between 1 - 25`;
  if (!arg) {
    return exitWithMessage(invalidMessage);
  }
  const day = parseInt(arg, 10);
  if (Number.isNaN(day)) {
    return exitWithMessage(invalidMessage);
  }
  if (day < 0 || day > 25) {
    return exitWithMessage(invalidMessage);
  }
  return day.toString().padStart(2, "0");
}

function validateSecondArg(arg: string): string | void {
  const invalidMessage = `Invalid argument "${arg}". Second argument must be either 1 or 2`;
  if (!arg) {
    return exitWithMessage(invalidMessage);
  }
  const day = parseInt(arg, 10);
  if (Number.isNaN(day)) {
    return exitWithMessage(invalidMessage);
  }
  if (day < 1 || day > 2) {
    return exitWithMessage(invalidMessage);
  }
  return day.toString();
}

const day = validateFirstArg(dayArg)!;
const part = validateSecondArg(partArg)!;

const input = await Bun.file(`inputs/input_${day}.txt`).text();
const processorPath = `./functions/day_${day}_${part}.ts`;
const processor = (await import(processorPath)).default as (
  input: string,
) => void;

if (typeof processor !== "function") {
  console.error(`Default export of "${processorPath}" is not a function`);
  process.exit(1);
}

processor(input);
