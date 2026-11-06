import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  ImportSolutionAsyncResponse as ImportSolutionAsyncResponseData,
  LayerDesiredOrder,
  SolutionParameters,
} from "./types/index.js";

/**
 * Parameters of the ImportSolutionAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportSolutionAsyncRequestParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile?: string;
  ImportJobId?: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  HoldingSolution?: boolean;
  SkipQueueRibbonJob?: boolean;
  LayerDesiredOrder?: LayerDesiredOrder;
  AsyncRibbonProcessing?: boolean;
  ComponentParameters?: Record<string, unknown>[];
  SolutionParameters?: SolutionParameters;
  IsTemplateMode?: boolean;
  TemplateSuffix?: string;
  TemplateDisplayNamePrefix?: string;
  StageAndUpgrade?: boolean;
  SchemaUpdatesOnly?: boolean;
}

/**
 * ImportSolutionAsync request message
 *
 * Web API Action: ImportSolutionAsync
 */
export class ImportSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<ImportSolutionAsyncResponse>
{
  declare readonly Parameters: Readonly<ImportSolutionAsyncRequestParameters>;

  constructor(parameters: ImportSolutionAsyncRequestParameters) {
    super("ImportSolutionAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolutionAsync`;

    const body = requestBody({
      OverwriteUnmanagedCustomizations: this.Parameters.OverwriteUnmanagedCustomizations,
      PublishWorkflows: this.Parameters.PublishWorkflows,
      CustomizationFile: this.Parameters.CustomizationFile,
      ImportJobId: this.Parameters.ImportJobId,
      ConvertToManaged: this.Parameters.ConvertToManaged,
      SkipProductUpdateDependencies: this.Parameters.SkipProductUpdateDependencies,
      HoldingSolution: this.Parameters.HoldingSolution,
      SkipQueueRibbonJob: this.Parameters.SkipQueueRibbonJob,
      LayerDesiredOrder: enumBody(this.Parameters.LayerDesiredOrder, "LayerDesiredOrder"),
      AsyncRibbonProcessing: this.Parameters.AsyncRibbonProcessing,
      ComponentParameters: this.Parameters.ComponentParameters,
      SolutionParameters: enumBody(this.Parameters.SolutionParameters, "SolutionParameters"),
      IsTemplateMode: this.Parameters.IsTemplateMode,
      TemplateSuffix: this.Parameters.TemplateSuffix,
      TemplateDisplayNamePrefix: this.Parameters.TemplateDisplayNamePrefix,
      StageAndUpgrade: this.Parameters.StageAndUpgrade,
      SchemaUpdatesOnly: this.Parameters.SchemaUpdatesOnly,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportSolutionAsyncResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ImportSolutionAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ImportSolutionAsync response message
 */
export class ImportSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: ImportSolutionAsyncResponseData) {
    super("ImportSolutionAsync");
  }

  static fromResponse(data: unknown): ImportSolutionAsyncResponse {
    return new ImportSolutionAsyncResponse(responseObject<ImportSolutionAsyncResponseData>(data));
  }
}
