import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Parameters of the ImportSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportSolutionRequestParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile: string;
  ImportJobId: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  HoldingSolution?: boolean;
  SkipQueueRibbonJob?: boolean;
  LayerDesiredOrder?: LayerDesiredOrder;
  AsyncRibbonProcessing?: boolean;
  ComponentParameters?: Record<string, unknown>[];
  IsTemplateMode?: boolean;
  TemplateSuffix?: string;
  SolutionParameters?: SolutionParameters;
  TemplateDisplayNamePrefix?: string;
  StageAndUpgrade?: boolean;
  SchemaUpdatesOnly?: boolean;
}

/**
 * ImportSolution request message
 *
 * Web API Action: ImportSolution
 */
export class ImportSolutionRequest
  extends OrganizationRequest
  implements Executable<ImportSolutionResponse>
{
  declare readonly Parameters: Readonly<ImportSolutionRequestParameters>;

  constructor(parameters: ImportSolutionRequestParameters) {
    super("ImportSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportSolution`;

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
      IsTemplateMode: this.Parameters.IsTemplateMode,
      TemplateSuffix: this.Parameters.TemplateSuffix,
      SolutionParameters: enumBody(this.Parameters.SolutionParameters, "SolutionParameters"),
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

  parseResponse(_response: Response): Promise<ImportSolutionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ImportSolutionResponse());
  }
}

/**
 * ImportSolution response message
 */
export class ImportSolutionResponse extends OrganizationResponse {
  constructor() {
    super("ImportSolution");
  }

  static fromResponse(_data?: unknown): ImportSolutionResponse {
    return new ImportSolutionResponse();
  }
}
