import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetFCSValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSValueRequestParameters {
  Key: string;
  Namespace: string;
}

/**
 * msdyn_GetFCSValue request message
 *
 * Web API Action: msdyn_GetFCSValue
 */
export class msdyn_GetFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCSValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFCSValueRequestParameters>;

  constructor(parameters: msdyn_GetFCSValueRequestParameters) {
    super("msdyn_GetFCSValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSValue`;

    const body = requestBody({
      Key: this.Parameters.Key,
      Namespace: this.Parameters.Namespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetFCSValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFCSValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFCSValueResult {
  "@odata.context"?: string;
  Value: boolean;
}

/**
 * msdyn_GetFCSValue response message
 *
 * `result` is the value the msdyn_GetFCSValue action returns (see {@link msdyn_GetFCSValueResult}).
 */
export class msdyn_GetFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSValueResult) {
    super("msdyn_GetFCSValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFCSValueResponse {
    return new msdyn_GetFCSValueResponse(data as msdyn_GetFCSValueResult);
  }
}
