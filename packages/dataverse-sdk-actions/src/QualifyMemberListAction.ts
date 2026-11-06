import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from QualifyMemberList action
 */
export interface QualifyMemberListResponse {
  // No content returned
}

/**
 * Parameters of the QualifyMemberList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QualifyMemberListActionParameters {
  ListMember: Record<string, unknown>[];
  OverrideorRemove: boolean;
}

/**
 * QualifyMemberList action
 *
 * Bound action
 * Binding parameter: entity (mscrm.list)
 *
 * The first argument is the id of the list record to call it on.
 */
export class QualifyMemberListAction implements Executable<QualifyMemberListResponse> {
  constructor(
    public readonly listId: string,
    public readonly parameters: QualifyMemberListActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.QualifyMemberList`;

    const body = requestBody({
      ListMember: this.parameters.ListMember,
      OverrideorRemove: this.parameters.OverrideorRemove,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QualifyMemberListResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as QualifyMemberListResponse;
  }
}
