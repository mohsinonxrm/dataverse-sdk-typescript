import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_UpdateIsCustomFieldForOrganizationEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateIsCustomFieldForOrganizationEntityResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateIsCustomFieldForOrganizationEntityResponse;
  }
}
