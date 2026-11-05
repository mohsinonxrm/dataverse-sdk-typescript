import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { SyncCopresenceStateResponse as SyncCopresenceStateResponseData } from "./types/index.js";

/**
 * SyncCopresenceState request message
 *
 * Web API Action: SyncCopresenceState
 */
export class SyncCopresenceStateRequest
  extends OrganizationRequest
  implements Executable<SyncCopresenceStateResponse>
{
  constructor(
    public resourceId: string,
    public resourceType: string,
    public userConnectionDetails: string
  ) {
    super("SyncCopresenceState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncCopresenceState`;

    const body: Record<string, unknown> = {
      ResourceId: this.resourceId,
      ResourceType: this.resourceType,
      UserConnectionDetails: this.userConnectionDetails,
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

  async parseResponse(response: Response): Promise<SyncCopresenceStateResponse> {
    const data = await response.json();
    return SyncCopresenceStateResponse.fromResponse(data);
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
