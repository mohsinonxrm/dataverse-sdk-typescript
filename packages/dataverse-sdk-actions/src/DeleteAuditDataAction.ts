import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteAuditData action
 */
export interface DeleteAuditDataResponse {
  PartitionsDeleted: number;
}

/**
 * DeleteAuditData action
 *
 * Unbound action
 */
export class DeleteAuditDataAction implements Executable<DeleteAuditDataResponse> {
  constructor(public readonly endDate: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAuditData`;

    const body: Record<string, unknown> = {
      EndDate: this.endDate,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DeleteAuditDataResponse> {
    const data = await response.json();
    return data as DeleteAuditDataResponse;
  }
}
