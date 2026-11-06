import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SyncCopresenceState action
 */
export interface SyncCopresenceStateResponse {
  CopresenceInfo: string;
}

/**
 * Parameters of the SyncCopresenceState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SyncCopresenceStateActionParameters {
  ResourceId: string;
  ResourceType: string;
  UserConnectionDetails: string;
}

/**
 * SyncCopresenceState action
 *
 * Unbound action
 */
export class SyncCopresenceStateAction implements Executable<SyncCopresenceStateResponse> {
  constructor(public readonly parameters: SyncCopresenceStateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncCopresenceState`;

    const body = requestBody({
      ResourceId: this.parameters.ResourceId,
      ResourceType: this.parameters.ResourceType,
      UserConnectionDetails: this.parameters.UserConnectionDetails,
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

  async parseResponse(response: Response): Promise<SyncCopresenceStateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SyncCopresenceStateResponse;
    return (await response.json()) as SyncCopresenceStateResponse;
  }
}
