import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTPullDeviceDataActionHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTPullDeviceDataActionHandlerRequestParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTPullDeviceDataActionHandler request message
 *
 * Web API Action: msdyn_IoTPullDeviceDataActionHandler
 */
export class msdyn_IoTPullDeviceDataActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTPullDeviceDataActionHandlerResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTPullDeviceDataActionHandlerRequestParameters>;

  constructor(parameters: msdyn_IoTPullDeviceDataActionHandlerRequestParameters = {}) {
    super("msdyn_IoTPullDeviceDataActionHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTPullDeviceDataActionHandler`;

    const body = requestBody({
      EntityCollection: this.Parameters.EntityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTPullDeviceDataActionHandlerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IoTPullDeviceDataActionHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTPullDeviceDataActionHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTPullDeviceDataActionHandlerResult {
  "@odata.context"?: string;
  PullDeviceDataResultsJSON: string;
}

/**
 * msdyn_IoTPullDeviceDataActionHandler response message
 *
 * `result` is the value the msdyn_IoTPullDeviceDataActionHandler action returns (see {@link msdyn_IoTPullDeviceDataActionHandlerResult}).
 */
export class msdyn_IoTPullDeviceDataActionHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTPullDeviceDataActionHandlerResult) {
    super("msdyn_IoTPullDeviceDataActionHandler");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTPullDeviceDataActionHandlerResponse {
    return new msdyn_IoTPullDeviceDataActionHandlerResponse(
      data as msdyn_IoTPullDeviceDataActionHandlerResult
    );
  }
}
