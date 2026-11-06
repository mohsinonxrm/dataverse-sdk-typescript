import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SyncCopresenceStateResponse as SyncCopresenceStateResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return SyncCopresenceStateResponse.fromResponse({});
    return SyncCopresenceStateResponse.fromResponse(await response.json());
  }
}

/**
 * SyncCopresenceState response message
 */
export class SyncCopresenceStateResponse extends OrganizationResponse {
  constructor(public result: SyncCopresenceStateResponseData) {
    super("SyncCopresenceState");
  }

  static fromResponse(data: unknown): SyncCopresenceStateResponse {
    return new SyncCopresenceStateResponse(responseObject<SyncCopresenceStateResponseData>(data));
  }
}
