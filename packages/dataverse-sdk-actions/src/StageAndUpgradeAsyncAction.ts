import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { LayerDesiredOrder, SolutionParameters } from "./types/index.js";

/**
 * Response from StageAndUpgradeAsync action
 */
export interface StageAndUpgradeAsyncResponse {
  AsyncOperationId: string;
  ImportJobKey: string;
}

/**
 * StageAndUpgradeAsync action
 *
 * Unbound action
 */
export class StageAndUpgradeAsyncAction implements Executable<StageAndUpgradeAsyncResponse> {
  constructor(
    public readonly overwriteUnmanagedCustomizations: boolean,
    public readonly publishWorkflows: boolean,
    public readonly customizationFile?: string,
    public readonly importJobId?: string,
    public readonly convertToManaged?: boolean,
    public readonly skipProductUpdateDependencies?: boolean,
    public readonly skipQueueRibbonJob?: boolean,
    public readonly asyncRibbonProcessing?: boolean,
    public readonly componentParameters?: Record<string, unknown>[],
    public readonly solutionParameters?: SolutionParameters,
    public readonly layerDesiredOrder?: LayerDesiredOrder,
    public readonly schemaUpdatesOnly?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageAndUpgradeAsync`;

    const body: Record<string, unknown> = {
      OverwriteUnmanagedCustomizations: this.overwriteUnmanagedCustomizations,
      PublishWorkflows: this.publishWorkflows,
      CustomizationFile: this.customizationFile,
      ImportJobId: this.importJobId,
      ConvertToManaged: this.convertToManaged,
      SkipProductUpdateDependencies: this.skipProductUpdateDependencies,
      SkipQueueRibbonJob: this.skipQueueRibbonJob,
      AsyncRibbonProcessing: this.asyncRibbonProcessing,
      ComponentParameters: this.componentParameters,
      SolutionParameters: enumBody(this.solutionParameters, "SolutionParameters"),
      LayerDesiredOrder: enumBody(this.layerDesiredOrder, "LayerDesiredOrder"),
      SchemaUpdatesOnly: this.schemaUpdatesOnly,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<StageAndUpgradeAsyncResponse> {
    const data = await response.json();
    return data as StageAndUpgradeAsyncResponse;
  }
}
