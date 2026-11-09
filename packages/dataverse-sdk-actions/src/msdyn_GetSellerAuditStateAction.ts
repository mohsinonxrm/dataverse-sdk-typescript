import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetSellerAuditState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSellerAuditStateResponse {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetSellerAuditState action
 *
 * Unbound action
 */
export class msdyn_GetSellerAuditStateAction implements Executable<msdyn_GetSellerAuditStateResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSellerAuditState`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSellerAuditStateResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSellerAuditStateResponse;
  }
}
