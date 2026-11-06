import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSequenceAssignedOwnersResponse as msdyn_GetSequenceAssignedOwnersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSequenceAssignedOwners message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSequenceAssignedOwnersRequestParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SequenceIds: string;
}

/**
 * msdyn_GetSequenceAssignedOwners request message
 *
 * Web API Action: msdyn_GetSequenceAssignedOwners
 */
export class msdyn_GetSequenceAssignedOwnersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSequenceAssignedOwnersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSequenceAssignedOwnersRequestParameters>;

  constructor(parameters: msdyn_GetSequenceAssignedOwnersRequestParameters) {
    super("msdyn_GetSequenceAssignedOwners", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAssignedOwners`;

    const body = requestBody({
      RegardingEntityId: this.Parameters.RegardingEntityId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
      SequenceIds: this.Parameters.SequenceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAssignedOwnersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSequenceAssignedOwnersResponse.fromResponse({});
    return msdyn_GetSequenceAssignedOwnersResponse.fromResponse(await response.json());
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
