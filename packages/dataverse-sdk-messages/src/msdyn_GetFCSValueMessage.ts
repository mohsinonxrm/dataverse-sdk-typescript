import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetFCSValueResponse as msdyn_GetFCSValueResponseData } from "./types/index.js";

/**
 * msdyn_GetFCSValue request message
 *
 * Web API Action: msdyn_GetFCSValue
 */
export class msdyn_GetFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCSValueResponse>
{
  constructor(
    public key: string,
    public namespace: string
  ) {
    super("msdyn_GetFCSValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSValue`;

    const body: Record<string, unknown> = {
      Key: this.key,
      Namespace: this.namespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    const data = await response.json();
    return msdyn_GetFCSValueResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetFCSValue response message
 */
export class msdyn_GetFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSValueResponseData) {
    super("msdyn_GetFCSValue");
  }

  static fromResponse(data: unknown): msdyn_GetFCSValueResponse {
    return new msdyn_GetFCSValueResponse(responseObject<msdyn_GetFCSValueResponseData>(data));
  }
}
