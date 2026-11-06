import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_applyworktemplateforresources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_applyworktemplateforresourcesRequestParameters {
  calendarIds: string;
  templateCalendarId?: string;
}

/**
 * msdyn_applyworktemplateforresources request message
 *
 * Web API Action: msdyn_applyworktemplateforresources
 */
export class msdyn_applyworktemplateforresourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_applyworktemplateforresourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_applyworktemplateforresourcesRequestParameters>;

  constructor(parameters: msdyn_applyworktemplateforresourcesRequestParameters) {
    super("msdyn_applyworktemplateforresources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_applyworktemplateforresources`;

    const body = requestBody({
      calendarIds: this.Parameters.calendarIds,
      templateCalendarId: this.Parameters.templateCalendarId,
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

  async parseResponse(response: Response): Promise<msdyn_applyworktemplateforresourcesResponse> {
    // No return value (204 No Content)
    return new msdyn_applyworktemplateforresourcesResponse();
  }
}

/**
 * msdyn_applyworktemplateforresources response message
 */
export class msdyn_applyworktemplateforresourcesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_applyworktemplateforresources");
  }

  static fromResponse(_data: unknown): msdyn_applyworktemplateforresourcesResponse {
    return new msdyn_applyworktemplateforresourcesResponse();
  }
}
