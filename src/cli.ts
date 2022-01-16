#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import {
  TemplateInputValues,
  TemplateOptions,
  TemplateType,
} from "./types/template.type";
import { htmlTemplate } from "./templates/html.template";
import { FILE_EXTS } from "./consts/extensions";
import { routerTemplate } from "./templates/router.template";

// 경로 존재 여부 확인
const exist = (dir: string) => {
  try {
    const VisibleOrReadableOrWritableStatus =
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK;
    fs.accessSync(dir, VisibleOrReadableOrWritableStatus);
    return true;
  } catch (_e) {
    return false;
  }
};

const mkdirp = (dir: string) => {
  const normalizedDir = path.normalize(dir);

  const splitDir = path
    .relative(".", normalizedDir)
    .split(path.sep)
    .filter((p) => Boolean(p));

  // 입력받은 dir 가 없으면 생성한다.
  splitDir.forEach((_, idx) => {
    const subDir = splitDir.slice(0, idx + 1).join(path.sep);
    if (!exist(subDir)) {
      fs.mkdirSync(subDir);
    }
  });
};

const makeTemplate = (
  type: TemplateType | string,
  fileName: string,
  directory: string
) => {
  mkdirp(directory);
  const newFileDir = path.join(directory, `${fileName}.${FILE_EXTS[type]}`);

  switch (type) {
    case "HTML":
      if (exist(newFileDir)) {
        console.error(chalk.bold.red("이미 존재하는 파일입니다."));
      } else {
        fs.writeFileSync(newFileDir, htmlTemplate);
        console.log(chalk.green(newFileDir, "생성 완료"));
      }
      break;
    case "EXPRESS_ROUTER":
      if (exist(newFileDir)) {
        console.error(chalk.bold.red("이미 존재하는 파일입니다."));
      } else {
        fs.writeFileSync(newFileDir, routerTemplate);
        console.log(chalk.green(newFileDir, "생성 완료"));
      }
      break;
    default:
      console.error(
        chalk.bold.red("html 또는 express-router 둘 중 하나를 입력하세요.")
      );
  }
};

program.version("0.0.1", "-v, --version").name("cli");

program
  .command("template <type>")
  .usage("<type> --filename [filename] --path [path]")
  .description("템플릿을 생성합니다.")
  .alias("tmpl")
  .option("-f, --filename [filename]", "파일명을 입력하세요.", "index")
  .option("-d, --directory [path]", "생성 경로를 입력하세요.", ".")
  .action((type: TemplateType | string, options: TemplateOptions) =>
    makeTemplate(type, options.filename, options.directory)
  );

program
  .action((cmd: string, args: string[]) => {
    if (args) {
      console.log(chalk.bold.red("해당 명령어를 찾을 수 없습니다."));
      program.help();
    } else {
      inquirer
        .prompt<TemplateInputValues>([
          {
            type: "list",
            name: "type",
            message: "템플릿 종류를 선택하세요.",
            choices: ["html", "express-router"],
          },
          {
            type: "input",
            name: "filename",
            message: "파일의 이름을 입력하세요.",
            default: "index",
          },
          {
            type: "input",
            name: "directory",
            message: "파일이 위치할 폴더의 경로를 입력하세요.",
            default: ".",
          },
          {
            type: "confirm",
            name: "confirm",
            message: "생성하시겠습니까?",
          },
        ])
        .then(({ confirm, type, filename, directory }) => {
          if (confirm) {
            makeTemplate(type, filename, directory);
            console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
          }
        });
    }
  })
  .parse(process.argv);
