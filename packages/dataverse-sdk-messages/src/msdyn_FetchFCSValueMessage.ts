import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FetchFCSValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchFCSValueRequestParameters {
  Namespace: string;
  Key: string;
}

/**
 * msdyn_FetchFCSValue request message
 *
 * Web API Action: msdyn_FetchFCSValue
 */
export class msdyn_FetchFCSValueRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchFCSValueResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchFCSValueRequestParameters>;

  constructor(parameters: msdyn_FetchFCSValueRequestParameters) {
    super("msdyn_FetchFCSValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchFCSValue`;

    const body = requestBody({
      Namespace: this.Parameters.Namespace,
      Key: this.Parameters.Key,
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

  async parseResponse(response: Response): Promise<msdyn_FetchFCSValueResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FetchFCSValueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchFCSValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchFCSValueResult {
  "@odata.context"?: string;
  Value: string;
}

/**
 * msdyn_FetchFCSValue response message
 *
 * `result` is the value the msdyn_FetchFCSValue action returns (see {@link msdyn_FetchFCSValueResult}).
 */
export class msdyn_FetchFCSValueResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchFCSValueResult) {
    super("msdyn_FetchFCSValue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchFCSValueResponse {
    return new msdyn_FetchFCSValueResponse(data as msdyn_FetchFCSValueResult);
  }
}
