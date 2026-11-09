import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetAuditState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAuditStateResponse {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetAuditState action
 *
 * Unbound action
 */
export class msdyn_GetAuditStateAction implements Executable<msdyn_GetAuditStateResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAuditState`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAuditStateResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAuditStateResponse;
  }
}
