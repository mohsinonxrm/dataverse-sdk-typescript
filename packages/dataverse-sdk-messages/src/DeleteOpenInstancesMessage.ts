import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * DeleteOpenInstances request message
 *
 * Web API Action: DeleteOpenInstances
 */
export class DeleteOpenInstancesRequest
  extends OrganizationRequest
  implements Executable<DeleteOpenInstancesResponse>
{
  constructor(
    public target: recurringappointmentmaster,
    public seriesEndDate: string,
    public stateOfPastInstances: number
  ) {
    super("DeleteOpenInstances");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOpenInstances`;

    const body: Record<string, unknown> = {
      Target: this.target,
      SeriesEndDate: this.seriesEndDate,
      StateOfPastInstances: this.stateOfPastInstances,
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

  async parseResponse(response: Response): Promise<DeleteOpenInstancesResponse> {
    // No return value (204 No Content)
    return new DeleteOpenInstancesResponse();
  }
}

/**
 * DeleteOpenInstances response message
 */
export class DeleteOpenInstancesResponse extends OrganizationResponse {
  constructor() {
    super("DeleteOpenInstances");
  }

  static fromResponse(_data: unknown): DeleteOpenInstancesResponse {
    return new DeleteOpenInstancesResponse();
  }
}
