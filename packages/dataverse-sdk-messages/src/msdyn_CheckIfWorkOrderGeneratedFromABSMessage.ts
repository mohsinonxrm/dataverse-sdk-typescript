import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfWorkOrderGeneratedFromABSResponse as msdyn_CheckIfWorkOrderGeneratedFromABSResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfWorkOrderGeneratedFromABS request message
 *
 * Web API Action: msdyn_CheckIfWorkOrderGeneratedFromABS
 */
export class msdyn_CheckIfWorkOrderGeneratedFromABSRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfWorkOrderGeneratedFromABSResponse>
{
  constructor(public timeInterval: string) {
    super("msdyn_CheckIfWorkOrderGeneratedFromABS");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkOrderGeneratedFromABS`;

    const body: Record<string, unknown> = {
      TimeInterval: this.timeInterval,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfWorkOrderGeneratedFromABSResponse> {
    const data = await response.json();
    return msdyn_CheckIfWorkOrderGeneratedFromABSResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfWorkOrderGeneratedFromABS response message
 */
export class msdyn_CheckIfWorkOrderGeneratedFromABSResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfWorkOrderGeneratedFromABSResponseData) {
    super("msdyn_CheckIfWorkOrderGeneratedFromABS");
  }

  static fromResponse(data: unknown): msdyn_CheckIfWorkOrderGeneratedFromABSResponse {
    return new msdyn_CheckIfWorkOrderGeneratedFromABSResponse(
      responseObject<msdyn_CheckIfWorkOrderGeneratedFromABSResponseData>(data)
    );
  }
}
