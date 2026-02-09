import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PerformNotesAnalysisAction request message
 *
 * Web API Action: msdyn_PerformNotesAnalysisAction
 */
export class msdyn_PerformNotesAnalysisActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_PerformNotesAnalysisActionResponse>
{
  constructor(
    public entityName: string,
    public serializedAction: string,
    public parentEntityName: string,
    public parentEntityId: string
  ) {
    super("msdyn_PerformNotesAnalysisAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformNotesAnalysisAction`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      SerializedAction: this.serializedAction,
      ParentEntityName: this.parentEntityName,
      ParentEntityId: this.parentEntityId,
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

  async parseResponse(response: Response): Promise<msdyn_PerformNotesAnalysisActionResponse> {
    const data = await response.json();
    return msdyn_PerformNotesAnalysisActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
      SerializedAction: this.serializedAction,
      ParentEntityName: this.parentEntityName,
      ParentEntityId: this.parentEntityId,
    };
  }
}

/**
 * msdyn_PerformNotesAnalysisAction response message
 */
export class msdyn_PerformNotesAnalysisActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_PerformNotesAnalysisActionResponse) {
    super("msdyn_PerformNotesAnalysisAction");
  }

  static fromResponse(data: unknown): msdyn_PerformNotesAnalysisActionResponse {
    return new msdyn_PerformNotesAnalysisActionResponse((data as any).value);
  }
}
