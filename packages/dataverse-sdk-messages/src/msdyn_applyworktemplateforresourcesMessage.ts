import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_applyworktemplateforresources request message
 *
 * Web API Action: msdyn_applyworktemplateforresources
 */
export class msdyn_applyworktemplateforresourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_applyworktemplateforresourcesResponse>
{
  constructor(
    public calendarIds: string,
    public templateCalendarId: string
  ) {
    super("msdyn_applyworktemplateforresources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_applyworktemplateforresources`;

    const body: Record<string, unknown> = {
      calendarIds: this.calendarIds,
      templateCalendarId: this.templateCalendarId,
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
