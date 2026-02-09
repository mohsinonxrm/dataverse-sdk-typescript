import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesRoutingIdentifyAttributes request message
 *
 * Web API Action: msdyn_SalesRoutingIdentifyAttributes
 */
export class msdyn_SalesRoutingIdentifyAttributesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesRoutingIdentifyAttributesResponse>
{
  constructor() {
    super("msdyn_SalesRoutingIdentifyAttributes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesRoutingIdentifyAttributes`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesRoutingIdentifyAttributesResponse> {
    const data = await response.json();
    return msdyn_SalesRoutingIdentifyAttributesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SalesRoutingIdentifyAttributes response message
 */
export class msdyn_SalesRoutingIdentifyAttributesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesRoutingIdentifyAttributesResponse) {
    super("msdyn_SalesRoutingIdentifyAttributes");
  }

  static fromResponse(data: unknown): msdyn_SalesRoutingIdentifyAttributesResponse {
    return new msdyn_SalesRoutingIdentifyAttributesResponse((data as any).value);
  }
}
