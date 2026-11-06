import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_JsonGetNumberResponse as msdyn_JsonGetNumberResponseData } from "./types/index.js";

/**
 * msdyn_JsonGetNumber request message
 *
 * Web API Action: msdyn_JsonGetNumber
 */
export class msdyn_JsonGetNumberRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetNumberResponse>
{
  constructor(
    public json: string | undefined,
    public propertyPath: string,
    public defaultReturnValue?: number
  ) {
    super("msdyn_JsonGetNumber");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetNumber`;

    const body: Record<string, unknown> = {
      Json: this.json,
      PropertyPath: this.propertyPath,
      DefaultReturnValue: this.defaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetNumberResponse> {
    const data = await response.json();
    return msdyn_JsonGetNumberResponse.fromResponse(data);
  }
}

/**
 * msdyn_JsonGetNumber response message
 */
export class msdyn_JsonGetNumberResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetNumberResponseData) {
    super("msdyn_JsonGetNumber");
  }

  static fromResponse(data: unknown): msdyn_JsonGetNumberResponse {
    return new msdyn_JsonGetNumberResponse(responseObject<msdyn_JsonGetNumberResponseData>(data));
  }
}
