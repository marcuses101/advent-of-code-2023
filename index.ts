function parseArguments(
  args: string[],
):
  | { status: "ok"; value: { day: string; part: string } }
  | { status: "error"; message: string } {
  const dayArg = args[2];
  const partArg = args[3] ?? "1";
  const dayValidationErrorMessage = `Invalid argument "${dayArg}". First argument must be a number between 1 - 25`;
  if (!dayArg) {
    return { status: "error", message: dayValidationErrorMessage };
  }
  const day = parseInt(dayArg, 10);
  if (Number.isNaN(day)) {
    return { status: "error", message: dayValidationErrorMessage };
  }
  if (day < 0 || day > 25) {
    return { status: "error", message: dayValidationErrorMessage };
  }
  const invalidPartMessage = `Invalid argument "${partArg}". Second argument must be either 1 or 2`;
  if (!partArg) {
    return { status: "error", message: invalidPartMessage };
  }
  const part = parseInt(partArg, 10);
  if (Number.isNaN(part)) {
    return { status: "error", message: invalidPartMessage };
  }
  if (part !== 1 && part !== 2) {
    return { status: "error", message: invalidPartMessage };
  }
  const value = { day: day.toString().padStart(2, "0"), part: part.toString() };
  return { status: "ok", value };
}

const argsResult = parseArguments(process.argv);
if (argsResult.status === "error") {
  console.error(argsResult.message);
  process.exit(1);
}
const { day, part } = argsResult.value;

const input = await Bun.file(`inputs/input_${day}.txt`).text();
const processorPath = `./functions/day_${day}_${part}.ts`;
const processor = (await import(processorPath)).default as (
  input: string,
) => string | number;

if (typeof processor !== "function") {
  console.error(`Default export of "${processorPath}" is not a function`);
  process.exit(1);
}

const answer = processor(input);
console.log(`The answer for day ${day} part ${part} is : ${answer}`);
