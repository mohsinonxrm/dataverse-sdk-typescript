import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_fetchemailsentimentsapiResponse as msdyn_fetchemailsentimentsapiResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_fetchemailsentimentsapi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchemailsentimentsapiRequestParameters {
  entityid?: string;
  entitylogicalname?: string;
}

/**
 * msdyn_fetchemailsentimentsapi request message
 *
 * Web API Action: msdyn_fetchemailsentimentsapi
 */
export class msdyn_fetchemailsentimentsapiRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchemailsentimentsapiResponse>
{
  declare readonly Parameters: Readonly<msdyn_fetchemailsentimentsapiRequestParameters>;

  constructor(parameters: msdyn_fetchemailsentimentsapiRequestParameters = {}) {
    super("msdyn_fetchemailsentimentsapi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchemailsentimentsapi`;

    const body = requestBody({
      entityid: this.Parameters.entityid,
      entitylogicalname: this.Parameters.entitylogicalname,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_fetchemailsentimentsapiResponse.fromResponse(text ? JSON.parse(text) : {});
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
