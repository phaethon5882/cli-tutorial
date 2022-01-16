#!/usr/bin/env node
// 위의 쉬뱅 문자(#!)는 js 를 nodejs cli 스크립트로 변환해준다.
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .commandDir("commands")
  .strict()
  .alias({ h: "help" }).argv;
