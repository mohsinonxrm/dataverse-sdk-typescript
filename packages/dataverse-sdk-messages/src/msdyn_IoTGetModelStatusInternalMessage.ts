import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTGetModelStatusInternalResponse as msdyn_IoTGetModelStatusInternalResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_IoTGetModelStatusInternalResponse.fromResponse({});
    return msdyn_IoTGetModelStatusInternalResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IoTGetModelStatusInternal response message
 */
export class msdyn_IoTGetModelStatusInternalResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetModelStatusInternalResponseData) {
    super("msdyn_IoTGetModelStatusInternal");
  }

  static fromResponse(data: unknown): msdyn_IoTGetModelStatusInternalResponse {
    return new msdyn_IoTGetModelStatusInternalResponse(
      responseObject<msdyn_IoTGetModelStatusInternalResponseData>(data)
    );
  }
}
