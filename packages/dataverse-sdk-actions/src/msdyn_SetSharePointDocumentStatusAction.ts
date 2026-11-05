import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetSharePointDocumentStatus action
 */
export interface msdyn_SetSharePointDocumentStatusResponse {
  PassedLogicalEntityNames: string;
  FailedLogicalEntityNames: string;
  OperationResult: boolean;
}

/**
 * msdyn_SetSharePointDocumentStatus action
 *
 * Unbound action
 */
export class msdyn_SetSharePointDocumentStatusAction implements Executable<msdyn_SetSharePointDocumentStatusResponse> {
  constructor(
    public readonly enable: boolean,
    public readonly logicalEntityNames: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetSharePointDocumentStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SetSharePointDocumentStatusResponse> {
    const data = await response.json();
    return data as msdyn_SetSharePointDocumentStatusResponse;
  }
}
