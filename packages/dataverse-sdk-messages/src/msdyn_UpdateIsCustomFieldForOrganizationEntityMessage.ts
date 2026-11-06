import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateIsCustomFieldForOrganizationEntityResponse as msdyn_UpdateIsCustomFieldForOrganizationEntityResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UpdateIsCustomFieldForOrganizationEntityResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_UpdateIsCustomFieldForOrganizationEntity response message
 */
export class msdyn_UpdateIsCustomFieldForOrganizationEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateIsCustomFieldForOrganizationEntityResponseData) {
    super("msdyn_UpdateIsCustomFieldForOrganizationEntity");
  }

  static fromResponse(data: unknown): msdyn_UpdateIsCustomFieldForOrganizationEntityResponse {
    return new msdyn_UpdateIsCustomFieldForOrganizationEntityResponse(
      responseObject<msdyn_UpdateIsCustomFieldForOrganizationEntityResponseData>(data)
    );
  }
}
