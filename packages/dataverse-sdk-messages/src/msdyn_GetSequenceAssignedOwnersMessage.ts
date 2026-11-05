import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSequenceAssignedOwnersResponse as msdyn_GetSequenceAssignedOwnersResponseData } from "./types/index.js";

/**
 * msdyn_GetSequenceAssignedOwners request message
 *
 * Web API Action: msdyn_GetSequenceAssignedOwners
 */
export class msdyn_GetSequenceAssignedOwnersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSequenceAssignedOwnersResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityName: string,
    public sequenceIds: string
  ) {
    super("msdyn_GetSequenceAssignedOwners");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAssignedOwners`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SequenceIds: this.sequenceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAssignedOwnersResponse> {
    const data = await response.json();
    return msdyn_GetSequenceAssignedOwnersResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSequenceAssignedOwners response message
 */
export class msdyn_GetSequenceAssignedOwnersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSequenceAssignedOwnersResponseData) {
    super("msdyn_GetSequenceAssignedOwners");
  }

  static fromResponse(data: unknown): msdyn_GetSequenceAssignedOwnersResponse {
    return new msdyn_GetSequenceAssignedOwnersResponse(
      responseObject<msdyn_GetSequenceAssignedOwnersResponseData>(data)
    );
  }
}
