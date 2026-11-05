import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_fetchemailsentimentsapiResponse as msdyn_fetchemailsentimentsapiResponseData } from "./types/index.js";

/**
 * msdyn_fetchemailsentimentsapi request message
 *
 * Web API Action: msdyn_fetchemailsentimentsapi
 */
export class msdyn_fetchemailsentimentsapiRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchemailsentimentsapiResponse>
{
  constructor(
    public entityid: string,
    public entitylogicalname: string
  ) {
    super("msdyn_fetchemailsentimentsapi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchemailsentimentsapi`;

    const body: Record<string, unknown> = {
      entityid: this.entityid,
      entitylogicalname: this.entitylogicalname,
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

  async parseResponse(response: Response): Promise<msdyn_fetchemailsentimentsapiResponse> {
    const data = await response.json();
    return msdyn_fetchemailsentimentsapiResponse.fromResponse(data);
  }
}

/**
 * msdyn_fetchemailsentimentsapi response message
 */
export class msdyn_fetchemailsentimentsapiResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchemailsentimentsapiResponseData) {
    super("msdyn_fetchemailsentimentsapi");
  }

  static fromResponse(data: unknown): msdyn_fetchemailsentimentsapiResponse {
    return new msdyn_fetchemailsentimentsapiResponse(
      responseObject<msdyn_fetchemailsentimentsapiResponseData>(data)
    );
  }
}
