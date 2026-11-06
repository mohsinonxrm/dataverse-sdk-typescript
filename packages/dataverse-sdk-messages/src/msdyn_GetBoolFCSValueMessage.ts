import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetBoolFCSValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBoolFCSValueRequestParameters {
  msdyn_BoolFCSNamespace: string;
  msdyn_BoolFCSKey: string;
}

/**
 * msdyn_GetBoolFCSValue request message
 *
 * Web API Action: msdyn_GetBoolFCSValue
 */
export class msdyn_GetBoolFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBoolFCSValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBoolFCSValueRequestParameters>;

  constructor(parameters: msdyn_GetBoolFCSValueRequestParameters) {
    super("msdyn_GetBoolFCSValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBoolFCSValue`;

    const body = requestBody({
      msdyn_BoolFCSNamespace: this.Parameters.msdyn_BoolFCSNamespace,
      msdyn_BoolFCSKey: this.Parameters.msdyn_BoolFCSKey,
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

  async parseResponse(response: Response): Promise<msdyn_GetBoolFCSValueResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetBoolFCSValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetBoolFCSValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetBoolFCSValueResult {
  "@odata.context"?: string;
  msdyn_BoolFCSValue: string;
}

/**
 * msdyn_GetBoolFCSValue response message
 *
 * `result` is the value the msdyn_GetBoolFCSValue action returns (see {@link msdyn_GetBoolFCSValueResult}).
 */
export class msdyn_GetBoolFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBoolFCSValueResult) {
    super("msdyn_GetBoolFCSValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetBoolFCSValueResponse {
    return new msdyn_GetBoolFCSValueResponse(data as msdyn_GetBoolFCSValueResult);
  }
}
