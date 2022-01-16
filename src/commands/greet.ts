import { Arguments, CommandBuilder } from "yargs";
import { IGreetOptions } from "../types/options.inteface";

export const command = "greet <name>";
export const desc = "Greet <name> with Hello";

export const builder: CommandBuilder<IGreetOptions, IGreetOptions> = (yargs) =>
  yargs
    .options({
      upper: { type: "boolean" },
    })
    .positional("name", { type: "string", demandOption: true });

export const handler = (argv: Arguments<IGreetOptions>): void => {
  const { name, upper } = argv;
  const greeting = `Hello, ${name}!`;
  process.stdout.write(upper ? greeting.toUpperCase() : greeting);
  process.exit(0);
};
