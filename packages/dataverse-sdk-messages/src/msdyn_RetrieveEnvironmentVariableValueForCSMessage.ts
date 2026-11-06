import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveEnvironmentVariableValueForCS message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters {
  msdyn_EnvironmentVariableName: string;
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS request message
 *
 * Web API Action: msdyn_RetrieveEnvironmentVariableValueForCS
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveEnvironmentVariableValueForCSResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters>;

  constructor(parameters: msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters) {
    super("msdyn_RetrieveEnvironmentVariableValueForCS", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEnvironmentVariableValueForCS`;

    const body = requestBody({
      msdyn_EnvironmentVariableName: this.Parameters.msdyn_EnvironmentVariableName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveEnvironmentVariableValueForCSResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveEnvironmentVariableValueForCS action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveEnvironmentVariableValueForCSResult {
  "@odata.context"?: string;
  msdyn_EnvironmentVariableValue: string;
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS response message
 *
 * `result` is the value the msdyn_RetrieveEnvironmentVariableValueForCS action returns (see {@link msdyn_RetrieveEnvironmentVariableValueForCSResult}).
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveEnvironmentVariableValueForCSResult) {
    super("msdyn_RetrieveEnvironmentVariableValueForCS");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveEnvironmentVariableValueForCSResponse {
    return new msdyn_RetrieveEnvironmentVariableValueForCSResponse(
      data as msdyn_RetrieveEnvironmentVariableValueForCSResult
    );
  }
}
