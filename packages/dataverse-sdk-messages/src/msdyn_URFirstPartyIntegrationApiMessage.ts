import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_URFirstPartyIntegrationApi request message
 *
 * Web API Action: msdyn_URFirstPartyIntegrationApi
 */
export class msdyn_URFirstPartyIntegrationApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_URFirstPartyIntegrationApiResponse>
{
  constructor(
    public methodName: string,
    public inputParameter: string
  ) {
    super("msdyn_URFirstPartyIntegrationApi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_URFirstPartyIntegrationApi`;

    const body: Record<string, unknown> = {
      MethodName: this.methodName,
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

  async parseResponse(response: Response): Promise<msdyn_URFirstPartyIntegrationApiResponse> {
    const data = await response.json();
    return msdyn_URFirstPartyIntegrationApiResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      MethodName: this.methodName,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_URFirstPartyIntegrationApi response message
 */
export class msdyn_URFirstPartyIntegrationApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_URFirstPartyIntegrationApiResponse) {
    super("msdyn_URFirstPartyIntegrationApi");
  }

  static fromResponse(data: unknown): msdyn_URFirstPartyIntegrationApiResponse {
    return new msdyn_URFirstPartyIntegrationApiResponse((data as any).value);
  }
}
