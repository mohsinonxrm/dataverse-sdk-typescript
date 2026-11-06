import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return ImportSolutionAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImportSolutionAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ImportSolutionAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
  ImportJobKey: string;
}

/**
 * ImportSolutionAsync response message
 *
 * `result` is the value the ImportSolutionAsync action returns (see {@link ImportSolutionAsyncResult}).
 */
export class ImportSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: ImportSolutionAsyncResult) {
    super("ImportSolutionAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImportSolutionAsyncResponse {
    return new ImportSolutionAsyncResponse(data as ImportSolutionAsyncResult);
  }
}
