import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_fetchemailsentimentsapi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchemailsentimentsapiRequestParameters {
  entitylogicalname?: string;
  entityid?: string;
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
      entitylogicalname: this.Parameters.entitylogicalname,
      entityid: this.Parameters.entityid,
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
    // The body is the complex value, with its @odata.context
    return msdyn_fetchemailsentimentsapiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_fetchemailsentimentsapi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchemailsentimentsapiResult {
  "@odata.context"?: string;
  emailsentimentsapijson: string;
}

/**
 * msdyn_fetchemailsentimentsapi response message
 *
 * `result` is the value the msdyn_fetchemailsentimentsapi action returns (see {@link msdyn_fetchemailsentimentsapiResult}).
 */
export class msdyn_fetchemailsentimentsapiResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchemailsentimentsapiResult) {
    super("msdyn_fetchemailsentimentsapi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_fetchemailsentimentsapiResponse {
    return new msdyn_fetchemailsentimentsapiResponse(data as msdyn_fetchemailsentimentsapiResult);
  }
}
