import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTGetModelStatusInternal message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetModelStatusInternalRequestParameters {
  ScenarioId: string;
}

/**
 * msdyn_IoTGetModelStatusInternal request message
 *
 * Web API Action: msdyn_IoTGetModelStatusInternal
 */
export class msdyn_IoTGetModelStatusInternalRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetModelStatusInternalResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTGetModelStatusInternalRequestParameters>;

  constructor(parameters: msdyn_IoTGetModelStatusInternalRequestParameters) {
    super("msdyn_IoTGetModelStatusInternal", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetModelStatusInternal`;

    const body = requestBody({
      ScenarioId: this.Parameters.ScenarioId,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetModelStatusInternalResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IoTGetModelStatusInternalResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTGetModelStatusInternal action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetModelStatusInternalResult {
  "@odata.context"?: string;
  MLModelStatusJSON: string;
}

/**
 * msdyn_IoTGetModelStatusInternal response message
 *
 * `result` is the value the msdyn_IoTGetModelStatusInternal action returns (see {@link msdyn_IoTGetModelStatusInternalResult}).
 */
export class msdyn_IoTGetModelStatusInternalResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetModelStatusInternalResult) {
    super("msdyn_IoTGetModelStatusInternal");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTGetModelStatusInternalResponse {
    return new msdyn_IoTGetModelStatusInternalResponse(
      data as msdyn_IoTGetModelStatusInternalResult
    );
  }
}
