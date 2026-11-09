import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SyncCopresenceState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SyncCopresenceStateRequestParameters {
  ResourceId: string;
  ResourceType: string;
  UserConnectionDetails: string;
}

/**
 * SyncCopresenceState request message
 *
 * Web API Action: SyncCopresenceState
 */
export class SyncCopresenceStateRequest
  extends OrganizationRequest
  implements Executable<SyncCopresenceStateResponse>
{
  declare readonly Parameters: Readonly<SyncCopresenceStateRequestParameters>;

  constructor(parameters: SyncCopresenceStateRequestParameters) {
    super("SyncCopresenceState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncCopresenceState`;

    const body = requestBody({
      ResourceId: this.Parameters.ResourceId,
      ResourceType: this.Parameters.ResourceType,
      UserConnectionDetails: this.Parameters.UserConnectionDetails,
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
    return SyncCopresenceStateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SyncCopresenceState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SyncCopresenceStateResult {
  "@odata.context"?: string;
  CopresenceInfo: string;
}

/**
 * SyncCopresenceState response message
 *
 * `result` is the value the SyncCopresenceState action returns (see {@link SyncCopresenceStateResult}).
 */
export class SyncCopresenceStateResponse extends OrganizationResponse {
  constructor(public result: SyncCopresenceStateResult) {
    super("SyncCopresenceState");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SyncCopresenceStateResponse {
    return new SyncCopresenceStateResponse(data as SyncCopresenceStateResult);
  }
}
