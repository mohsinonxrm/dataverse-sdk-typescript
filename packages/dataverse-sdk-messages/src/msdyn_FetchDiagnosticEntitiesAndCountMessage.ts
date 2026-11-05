import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FetchDiagnosticEntitiesAndCount request message
 *
 * Web API Action: msdyn_FetchDiagnosticEntitiesAndCount
 */
export class msdyn_FetchDiagnosticEntitiesAndCountRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchDiagnosticEntitiesAndCountResponse>
{
  constructor(
    public msdyn_RunId: string,
    public msdyn_Filter: string
  ) {
    super("msdyn_FetchDiagnosticEntitiesAndCount");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchDiagnosticEntitiesAndCount`;

    const body: Record<string, unknown> = {
      msdyn_RunId: this.msdyn_RunId,
      msdyn_Filter: this.msdyn_Filter,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FetchDiagnosticEntitiesAndCountResponse> {
    const data = await response.json();
    return msdyn_FetchDiagnosticEntitiesAndCountResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_RunId: this.msdyn_RunId,
      msdyn_Filter: this.msdyn_Filter,
    };
  }
}

/**
 * msdyn_FetchDiagnosticEntitiesAndCount response message
 */
export class msdyn_FetchDiagnosticEntitiesAndCountResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchDiagnosticEntitiesAndCountResponse) {
    super("msdyn_FetchDiagnosticEntitiesAndCount");
  }

  static fromResponse(data: unknown): msdyn_FetchDiagnosticEntitiesAndCountResponse {
    return new msdyn_FetchDiagnosticEntitiesAndCountResponse((data as any).value);
  }
}
