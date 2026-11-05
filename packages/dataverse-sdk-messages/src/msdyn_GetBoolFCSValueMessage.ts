import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetBoolFCSValue request message
 *
 * Web API Action: msdyn_GetBoolFCSValue
 */
export class msdyn_GetBoolFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBoolFCSValueResponse>
{
  constructor(
    public msdyn_BoolFCSKey: string,
    public msdyn_BoolFCSNamespace: string
  ) {
    super("msdyn_GetBoolFCSValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBoolFCSValue`;

    const body: Record<string, unknown> = {
      msdyn_BoolFCSKey: this.msdyn_BoolFCSKey,
      msdyn_BoolFCSNamespace: this.msdyn_BoolFCSNamespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetBoolFCSValueResponse> {
    const data = await response.json();
    return msdyn_GetBoolFCSValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_BoolFCSKey: this.msdyn_BoolFCSKey,
      msdyn_BoolFCSNamespace: this.msdyn_BoolFCSNamespace,
    };
  }
}

/**
 * msdyn_GetBoolFCSValue response message
 */
export class msdyn_GetBoolFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBoolFCSValueResponse) {
    super("msdyn_GetBoolFCSValue");
  }

  static fromResponse(data: unknown): msdyn_GetBoolFCSValueResponse {
    return new msdyn_GetBoolFCSValueResponse((data as any).value);
  }
}
