export type TemplateType = "HTML" | "EXPRESS_ROUTER";
export type TemplateOptions = {
  filename: string;
  directory: string;
};
export type TemplateInputValues = {
  type: string;
  filename: string;
  directory: string;
  confirm: boolean;
};
export const TEMPLATE_TYPE: string[] = ["HTML", "EXPRESS_ROUTER"];
