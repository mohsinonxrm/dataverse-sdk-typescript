import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSellerAuditState action
 */
export interface msdyn_GetSellerAuditStateResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSellerAuditStateResponse;
    return (await response.json()) as msdyn_GetSellerAuditStateResponse;
  }
}
