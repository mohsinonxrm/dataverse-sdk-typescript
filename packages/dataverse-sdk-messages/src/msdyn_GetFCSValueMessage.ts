import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    const data = await response.json();
    return msdyn_GetFCSValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Key: this.key,
      Namespace: this.namespace,
    };
  }
}

/**
 * msdyn_GetFCSValue response message
 */
export class msdyn_GetFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSValueResponse) {
    super("msdyn_GetFCSValue");
  }

  static fromResponse(data: unknown): msdyn_GetFCSValueResponse {
    return new msdyn_GetFCSValueResponse((data as any).value);
  }
}
