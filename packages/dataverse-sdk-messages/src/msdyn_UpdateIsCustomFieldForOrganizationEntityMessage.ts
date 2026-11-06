import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateIsCustomFieldForOrganizationEntity request message
 *
 * Web API Action: msdyn_UpdateIsCustomFieldForOrganizationEntity
 */
export class msdyn_UpdateIsCustomFieldForOrganizationEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateIsCustomFieldForOrganizationEntityResponse>
{
  constructor() {
    super("msdyn_UpdateIsCustomFieldForOrganizationEntity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateIsCustomFieldForOrganizationEntity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateIsCustomFieldForOrganizationEntityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateIsCustomFieldForOrganizationEntityResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_UpdateIsCustomFieldForOrganizationEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateIsCustomFieldForOrganizationEntityResult {
  "@odata.context"?: string;
  resultCode: number;
}

/**
 * msdyn_UpdateIsCustomFieldForOrganizationEntity response message
 *
 * `result` is the value the msdyn_UpdateIsCustomFieldForOrganizationEntity action returns (see {@link msdyn_UpdateIsCustomFieldForOrganizationEntityResult}).
 */
export class msdyn_UpdateIsCustomFieldForOrganizationEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateIsCustomFieldForOrganizationEntityResult) {
    super("msdyn_UpdateIsCustomFieldForOrganizationEntity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateIsCustomFieldForOrganizationEntityResponse {
    return new msdyn_UpdateIsCustomFieldForOrganizationEntityResponse(
      data as msdyn_UpdateIsCustomFieldForOrganizationEntityResult
    );
  }
}
