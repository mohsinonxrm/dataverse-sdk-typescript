import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTRegisterActionHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTRegisterActionHandlerRequestParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTRegisterActionHandler request message
 *
 * Web API Action: msdyn_IoTRegisterActionHandler
 */
export class msdyn_IoTRegisterActionHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTRegisterActionHandlerResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTRegisterActionHandlerRequestParameters>;

  constructor(parameters: msdyn_IoTRegisterActionHandlerRequestParameters = {}) {
    super("msdyn_IoTRegisterActionHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTRegisterActionHandler`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTRegisterActionHandlerResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IoTRegisterActionHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTRegisterActionHandler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTRegisterActionHandlerResult {
  "@odata.context"?: string;
  RegistrationResultsJSON: string;
}

/**
 * msdyn_IoTRegisterActionHandler response message
 *
 * `result` is the value the msdyn_IoTRegisterActionHandler action returns (see {@link msdyn_IoTRegisterActionHandlerResult}).
 */
export class msdyn_IoTRegisterActionHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTRegisterActionHandlerResult) {
    super("msdyn_IoTRegisterActionHandler");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTRegisterActionHandlerResponse {
    return new msdyn_IoTRegisterActionHandlerResponse(data as msdyn_IoTRegisterActionHandlerResult);
  }
}
