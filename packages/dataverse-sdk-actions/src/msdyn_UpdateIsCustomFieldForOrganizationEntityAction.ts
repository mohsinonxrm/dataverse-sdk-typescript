import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateIsCustomFieldForOrganizationEntity action
 */
export interface msdyn_UpdateIsCustomFieldForOrganizationEntityResponse {
  resultCode: number;
}

/**
 * msdyn_UpdateIsCustomFieldForOrganizationEntity action
 *
 * Unbound action
 */
export class msdyn_UpdateIsCustomFieldForOrganizationEntityAction implements Executable<msdyn_UpdateIsCustomFieldForOrganizationEntityResponse> {
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
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateIsCustomFieldForOrganizationEntityResponse;
  }
}
