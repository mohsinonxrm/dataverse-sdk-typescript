import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForDeletedBSMRecords action
 */
export interface msdyn_CheckForDeletedBSMRecordsResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForDeletedBSMRecords action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedBSMRecordsAction implements Executable<msdyn_CheckForDeletedBSMRecordsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedBSMRecords`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedBSMRecordsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForDeletedBSMRecordsResponse;
  }
}
