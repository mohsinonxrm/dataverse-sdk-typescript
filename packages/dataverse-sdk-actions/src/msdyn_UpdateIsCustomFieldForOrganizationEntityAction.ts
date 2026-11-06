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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_UpdateIsCustomFieldForOrganizationEntityResponse;
    return (await response.json()) as msdyn_UpdateIsCustomFieldForOrganizationEntityResponse;
  }
}
