import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetSequenceAssignedOwnersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSequenceAssignedOwners action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSequenceAssignedOwnersResult {
  "@odata.context"?: string;
  SequenceAssignedOwners: string;
}

/**
 * msdyn_GetSequenceAssignedOwners response message
 *
 * `result` is the value the msdyn_GetSequenceAssignedOwners action returns (see {@link msdyn_GetSequenceAssignedOwnersResult}).
 */
export class msdyn_GetSequenceAssignedOwnersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSequenceAssignedOwnersResult) {
    super("msdyn_GetSequenceAssignedOwners");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSequenceAssignedOwnersResponse {
    return new msdyn_GetSequenceAssignedOwnersResponse(
      data as msdyn_GetSequenceAssignedOwnersResult
    );
  }
}
