import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PerformNotesAnalysisAction action
 */
export interface msdyn_PerformNotesAnalysisActionResponse {
  Result: string;
}

/**
 * msdyn_PerformNotesAnalysisAction action
 *
 * Unbound action
 */
export class msdyn_PerformNotesAnalysisActionAction implements Executable<msdyn_PerformNotesAnalysisActionResponse> {
  constructor(
    public readonly entityName: string,
    public readonly serializedAction: string,
    public readonly parentEntityName: string,
    public readonly parentEntityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformNotesAnalysisAction`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      SerializedAction: this.serializedAction,
      ParentEntityName: this.parentEntityName,
      ParentEntityId: this.parentEntityId,
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

  async parseResponse(response: Response): Promise<msdyn_PerformNotesAnalysisActionResponse> {
    const data = await response.json();
    return data as msdyn_PerformNotesAnalysisActionResponse;
  }
}
