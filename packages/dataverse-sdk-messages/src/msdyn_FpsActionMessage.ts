import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FpsActionResponse as msdyn_FpsActionResponseData } from "./types/index.js";

/**
 * msdyn_FpsAction request message
 *
 * Web API Action: msdyn_FpsAction
 */
export class msdyn_FpsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FpsActionResponse>
{
  constructor(
    public type: number,
    public inputParameter?: string
  ) {
    super("msdyn_FpsAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FpsAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FpsActionResponse> {
    const data = await response.json();
    return msdyn_FpsActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_FpsAction response message
 */
export class msdyn_FpsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FpsActionResponseData) {
    super("msdyn_FpsAction");
  }

  static fromResponse(data: unknown): msdyn_FpsActionResponse {
    return new msdyn_FpsActionResponse(responseObject<msdyn_FpsActionResponseData>(data));
  }
}
