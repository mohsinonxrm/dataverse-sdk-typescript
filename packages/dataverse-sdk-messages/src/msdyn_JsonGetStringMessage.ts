import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_JsonGetStringResponse as msdyn_JsonGetStringResponseData } from "./types/index.js";

/**
 * msdyn_JsonGetString request message
 *
 * Web API Action: msdyn_JsonGetString
 */
export class msdyn_JsonGetStringRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetStringResponse>
{
  constructor(
    public json: string | undefined,
    public propertyPath: string,
    public defaultReturnValue?: string
  ) {
    super("msdyn_JsonGetString");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetString`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetStringResponse> {
    const data = await response.json();
    return msdyn_JsonGetStringResponse.fromResponse(data);
  }
}

/**
 * msdyn_JsonGetString response message
 */
export class msdyn_JsonGetStringResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetStringResponseData) {
    super("msdyn_JsonGetString");
  }

  static fromResponse(data: unknown): msdyn_JsonGetStringResponse {
    return new msdyn_JsonGetStringResponse(responseObject<msdyn_JsonGetStringResponseData>(data));
  }
}
