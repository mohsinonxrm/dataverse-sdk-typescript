import { ExportToExcelAction, createEntityReference } from "./actions/index.js";
export const x = new ExportToExcelAction({
  View: createEntityReference("savedquery", "v1"),
  FetchXml: "<fetch/>",
  LayoutXml: "<grid/>",
  QueryApi: "",
  QueryParameters: {},
});
// @ts-expect-error all five parameters are required
export const y = new ExportToExcelAction({ FetchXml: "<fetch/>", LayoutXml: "<grid/>", QueryApi: "" });
