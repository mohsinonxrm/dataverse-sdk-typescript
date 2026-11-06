import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckBookingCustomControlUsageResponse as msdyn_CheckBookingCustomControlUsageResponseData } from "./types/index.js";

/**
 * msdyn_CheckBookingCustomControlUsage request message
 *
 * Web API Action: msdyn_CheckBookingCustomControlUsage
 */
export class msdyn_CheckBookingCustomControlUsageRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckBookingCustomControlUsageResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckBookingCustomControlUsage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckBookingCustomControlUsage`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

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
    const data = await response.json();
    return msdyn_CheckBookingCustomControlUsageResponse.fromResponse(data);
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
