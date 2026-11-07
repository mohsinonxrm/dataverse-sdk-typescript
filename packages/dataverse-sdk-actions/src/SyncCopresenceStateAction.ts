import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SyncCopresenceState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SyncCopresenceStateResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SyncCopresenceStateResponse;
  }
}
