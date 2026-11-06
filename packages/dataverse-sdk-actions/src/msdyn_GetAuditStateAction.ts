import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAuditState action
 */
export interface msdyn_GetAuditStateResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetAuditStateResponse;
  }
}
