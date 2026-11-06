import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the QualifyMemberList action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type QualifyMemberListResponse = void;

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

  parseResponse(_response: Response): Promise<QualifyMemberListResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
