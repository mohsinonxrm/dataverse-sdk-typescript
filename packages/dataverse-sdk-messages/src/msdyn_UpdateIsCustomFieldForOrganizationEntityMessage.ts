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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateIsCustomFieldForOrganizationEntityResponse> {
    const data = await response.json();
    return msdyn_UpdateIsCustomFieldForOrganizationEntityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_UpdateIsCustomFieldForOrganizationEntity response message
 */
export class msdyn_UpdateIsCustomFieldForOrganizationEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateIsCustomFieldForOrganizationEntityResponse) {
    super("msdyn_UpdateIsCustomFieldForOrganizationEntity");
  }

  static fromResponse(data: unknown): msdyn_UpdateIsCustomFieldForOrganizationEntityResponse {
    return new msdyn_UpdateIsCustomFieldForOrganizationEntityResponse((data as any).value);
  }
}
