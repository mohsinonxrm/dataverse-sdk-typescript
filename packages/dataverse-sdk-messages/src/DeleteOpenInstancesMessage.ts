import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * Parameters of the DeleteOpenInstances message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOpenInstancesRequestParameters {
  Target: EntityReference | EntityPayload<recurringappointmentmaster>;
  SeriesEndDate: string;
  StateOfPastInstances: number;
}

/**
 * DeleteOpenInstances request message
 *
 * Web API Action: DeleteOpenInstances
 */
export class DeleteOpenInstancesRequest
  extends OrganizationRequest
  implements Executable<DeleteOpenInstancesResponse>
{
  declare readonly Parameters: Readonly<DeleteOpenInstancesRequestParameters>;

  constructor(parameters: DeleteOpenInstancesRequestParameters) {
    super("DeleteOpenInstances", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOpenInstances`;

    const body = requestBody({
      Target: this.Parameters.Target,
      SeriesEndDate: this.Parameters.SeriesEndDate,
      StateOfPastInstances: this.Parameters.StateOfPastInstances,
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
