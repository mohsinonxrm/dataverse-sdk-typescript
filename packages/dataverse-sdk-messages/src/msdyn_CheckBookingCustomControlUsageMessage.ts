import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckBookingCustomControlUsageResponse as msdyn_CheckBookingCustomControlUsageResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckBookingCustomControlUsage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckBookingCustomControlUsageRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckBookingCustomControlUsage request message
 *
 * Web API Action: msdyn_CheckBookingCustomControlUsage
 */
export class msdyn_CheckBookingCustomControlUsageRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckBookingCustomControlUsageResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckBookingCustomControlUsageRequestParameters>;

  constructor(parameters: msdyn_CheckBookingCustomControlUsageRequestParameters) {
    super("msdyn_CheckBookingCustomControlUsage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckBookingCustomControlUsage`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckBookingCustomControlUsageResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckBookingCustomControlUsageResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckBookingCustomControlUsage response message
 */
export class msdyn_CheckBookingCustomControlUsageResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckBookingCustomControlUsageResponseData) {
    super("msdyn_CheckBookingCustomControlUsage");
  }

  static fromResponse(data: unknown): msdyn_CheckBookingCustomControlUsageResponse {
    return new msdyn_CheckBookingCustomControlUsageResponse(
      responseObject<msdyn_CheckBookingCustomControlUsageResponseData>(data)
    );
  }
}
