import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Response from StageAndUpgrade action
 */
export interface StageAndUpgradeResponse {
  SolutionId: string;
}

/**
 * Parameters of the StageAndUpgrade action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface StageAndUpgradeActionParameters {
  OverwriteUnmanagedCustomizations: boolean;
  PublishWorkflows: boolean;
  CustomizationFile: string;
  ImportJobId: string;
  ConvertToManaged?: boolean;
  SkipProductUpdateDependencies?: boolean;
  SkipQueueRibbonJob?: boolean;
  AsyncRibbonProcessing?: boolean;
  ComponentParameters?: Record<string, unknown>[];
  SolutionParameters?: SolutionParameters;
  LayerDesiredOrder?: LayerDesiredOrder;
  SchemaUpdatesOnly?: boolean;
}

/**
 * StageAndUpgrade action
 *
 * Unbound action
 */
export class StageAndUpgradeAction implements Executable<StageAndUpgradeResponse> {
  constructor(public readonly parameters: StageAndUpgradeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageAndUpgrade`;

    const body = requestBody({
      OverwriteUnmanagedCustomizations: this.parameters.OverwriteUnmanagedCustomizations,
      PublishWorkflows: this.parameters.PublishWorkflows,
      CustomizationFile: this.parameters.CustomizationFile,
      ImportJobId: this.parameters.ImportJobId,
      ConvertToManaged: this.parameters.ConvertToManaged,
      SkipProductUpdateDependencies: this.parameters.SkipProductUpdateDependencies,
      SkipQueueRibbonJob: this.parameters.SkipQueueRibbonJob,
      AsyncRibbonProcessing: this.parameters.AsyncRibbonProcessing,
      ComponentParameters: this.parameters.ComponentParameters,
      SolutionParameters: enumBody(this.parameters.SolutionParameters, "SolutionParameters"),
      LayerDesiredOrder: enumBody(this.parameters.LayerDesiredOrder, "LayerDesiredOrder"),
      SchemaUpdatesOnly: this.parameters.SchemaUpdatesOnly,
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

  async parseResponse(response: Response): Promise<StageAndUpgradeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as StageAndUpgradeResponse;
  }
}
