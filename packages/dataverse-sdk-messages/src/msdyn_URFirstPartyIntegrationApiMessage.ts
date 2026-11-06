import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_URFirstPartyIntegrationApi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_URFirstPartyIntegrationApiRequestParameters {
  MethodName: string;
  InputParameter?: string;
}

/**
 * msdyn_URFirstPartyIntegrationApi request message
 *
 * Web API Action: msdyn_URFirstPartyIntegrationApi
 */
export class msdyn_URFirstPartyIntegrationApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_URFirstPartyIntegrationApiResponse>
{
  declare readonly Parameters: Readonly<msdyn_URFirstPartyIntegrationApiRequestParameters>;

  constructor(parameters: msdyn_URFirstPartyIntegrationApiRequestParameters) {
    super("msdyn_URFirstPartyIntegrationApi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_URFirstPartyIntegrationApi`;

    const body = requestBody({
      MethodName: this.Parameters.MethodName,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_URFirstPartyIntegrationApiResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_URFirstPartyIntegrationApiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_URFirstPartyIntegrationApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_URFirstPartyIntegrationApiResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_URFirstPartyIntegrationApi response message
 *
 * `result` is the value the msdyn_URFirstPartyIntegrationApi action returns (see {@link msdyn_URFirstPartyIntegrationApiResult}).
 */
export class msdyn_URFirstPartyIntegrationApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_URFirstPartyIntegrationApiResult) {
    super("msdyn_URFirstPartyIntegrationApi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_URFirstPartyIntegrationApiResponse {
    return new msdyn_URFirstPartyIntegrationApiResponse(
      data as msdyn_URFirstPartyIntegrationApiResult
    );
  }
}
