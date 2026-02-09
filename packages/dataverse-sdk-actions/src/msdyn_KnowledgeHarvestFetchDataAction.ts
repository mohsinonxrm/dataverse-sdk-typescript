import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_KnowledgeHarvestFetchData action
 */
export interface msdyn_KnowledgeHarvestFetchDataResponse {
  msdyn_response: string;
}

/**
 * msdyn_KnowledgeHarvestFetchData action
 *
 * Unbound action
 */
export class msdyn_KnowledgeHarvestFetchDataAction implements Executable<msdyn_KnowledgeHarvestFetchDataResponse> {
  constructor(
    public readonly msdyn_entityId: string,
    public readonly msdyn_entityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_KnowledgeHarvestFetchData`;

    const body: Record<string, unknown> = {
      msdyn_entityId: this.msdyn_entityId,
      msdyn_entityName: this.msdyn_entityName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_KnowledgeHarvestFetchDataResponse> {
    const data = await response.json();
    return data as msdyn_KnowledgeHarvestFetchDataResponse;
  }
}
