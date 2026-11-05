import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FSDemoDataRequestResponse as msdyn_FSDemoDataRequestResponseData } from "./types/index.js";

/**
 * msdyn_FSDemoDataRequest request message
 *
 * Web API Action: msdyn_FSDemoDataRequest
 */
export class msdyn_FSDemoDataRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_FSDemoDataRequestResponse>
{
  constructor(public operation: string) {
    super("msdyn_FSDemoDataRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FSDemoDataRequest`;

    const body: Record<string, unknown> = {
      Operation: this.operation,
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

  async parseResponse(response: Response): Promise<msdyn_FSDemoDataRequestResponse> {
    const data = await response.json();
    return msdyn_FSDemoDataRequestResponse.fromResponse(data);
  }
}

/**
 * msdyn_FSDemoDataRequest response message
 */
export class msdyn_FSDemoDataRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_FSDemoDataRequestResponseData) {
    super("msdyn_FSDemoDataRequest");
  }

  static fromResponse(data: unknown): msdyn_FSDemoDataRequestResponse {
    return new msdyn_FSDemoDataRequestResponse(
      responseObject<msdyn_FSDemoDataRequestResponseData>(data)
    );
  }
}
