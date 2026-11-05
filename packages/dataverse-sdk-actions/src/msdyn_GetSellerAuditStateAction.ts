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
    const data = await response.json();
    return data as msdyn_GetSellerAuditStateResponse;
  }
}
