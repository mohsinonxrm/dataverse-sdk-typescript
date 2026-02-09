import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MigrateArc request message
 *
 * Web API Action: msdyn_MigrateArc
 */
export class msdyn_MigrateArcRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateArcResponse>
{
  constructor(public arcMigrationRequest: string) {
    super("msdyn_MigrateArc");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateArc`;

    const body: Record<string, unknown> = {
      ArcMigrationRequest: this.arcMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateArcResponse> {
    const data = await response.json();
    return msdyn_MigrateArcResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ArcMigrationRequest: this.arcMigrationRequest,
    };
  }
}

/**
 * msdyn_MigrateArc response message
 */
export class msdyn_MigrateArcResponse extends OrganizationResponse {
  constructor(public result: msdyn_MigrateArcResponse) {
    super("msdyn_MigrateArc");
  }

  static fromResponse(data: unknown): msdyn_MigrateArcResponse {
    return new msdyn_MigrateArcResponse((data as any).value);
  }
}
