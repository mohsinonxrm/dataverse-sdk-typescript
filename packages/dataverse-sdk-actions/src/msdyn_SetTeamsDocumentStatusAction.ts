import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetTeamsDocumentStatus action
 */
export interface msdyn_SetTeamsDocumentStatusResponse {
  PassedLogicalEntityNames: string;
  FailedLogicalEntityNames: string;
  OperationResult: boolean;
}

/**
 * msdyn_SetTeamsDocumentStatus action
 *
 * Unbound action
 */
export class msdyn_SetTeamsDocumentStatusAction implements Executable<msdyn_SetTeamsDocumentStatusResponse> {
  constructor(
    public readonly enable: boolean,
    public readonly logicalEntityNames: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTeamsDocumentStatus`;

    const body: Record<string, unknown> = {
      Enable: this.enable,
      LogicalEntityNames: this.logicalEntityNames,
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

  async parseResponse(response: Response): Promise<msdyn_SetTeamsDocumentStatusResponse> {
    const data = await response.json();
    return data as msdyn_SetTeamsDocumentStatusResponse;
  }
}
