import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FetchFCSValue request message
 *
 * Web API Action: msdyn_FetchFCSValue
 */
export class msdyn_FetchFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchFCSValueResponse>
{
  constructor(
    public namespace: string,
    public key: string
  ) {
    super("msdyn_FetchFCSValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchFCSValue`;

    const body: Record<string, unknown> = {
      Namespace: this.namespace,
      Key: this.key,
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

  async parseResponse(response: Response): Promise<msdyn_FetchFCSValueResponse> {
    const data = await response.json();
    return msdyn_FetchFCSValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Namespace: this.namespace,
      Key: this.key,
    };
  }
}

/**
 * msdyn_FetchFCSValue response message
 */
export class msdyn_FetchFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchFCSValueResponse) {
    super("msdyn_FetchFCSValue");
  }

  static fromResponse(data: unknown): msdyn_FetchFCSValueResponse {
    return new msdyn_FetchFCSValueResponse((data as any).value);
  }
}
