import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the QualifyMemberList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QualifyMemberListRequestParameters {
  ListMember: Record<string, unknown>[];
  OverrideorRemove: boolean;
}

/**
 * QualifyMemberList request message
 *
 * Web API Action: QualifyMemberList
 *
 * The first argument is the id of the list record to call it on.
 */
export class QualifyMemberListRequest
  extends OrganizationRequest
  implements Executable<QualifyMemberListResponse>
{
  declare readonly Parameters: Readonly<QualifyMemberListRequestParameters>;

  constructor(
    public listId: string,
    parameters: QualifyMemberListRequestParameters
  ) {
    super("QualifyMemberList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/lists(${this.listId})/Microsoft.Dynamics.CRM.QualifyMemberList`;

    const body = requestBody({
      ListMember: this.Parameters.ListMember,
      OverrideorRemove: this.Parameters.OverrideorRemove,
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
    // No return value (204 No Content)
    return Promise.resolve(new QualifyMemberListResponse());
  }
}

/**
 * QualifyMemberList response message
 */
export class QualifyMemberListResponse extends OrganizationResponse {
  constructor() {
    super("QualifyMemberList");
  }

  static fromResponse(_data?: unknown): QualifyMemberListResponse {
    return new QualifyMemberListResponse();
  }
}
