import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_StartMigrationCustomAction request message
 *
 * Web API Action: msdynmkt_StartMigrationCustomAction
 */
export class msdynmkt_StartMigrationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_StartMigrationCustomActionResponse>
{
  constructor(public whatIf: boolean) {
    super("msdynmkt_StartMigrationCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartMigrationCustomAction`;

    const body: Record<string, unknown> = {
      WhatIf: this.whatIf,
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

  async parseResponse(response: Response): Promise<msdynmkt_StartMigrationCustomActionResponse> {
    const data = await response.json();
    return msdynmkt_StartMigrationCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      WhatIf: this.whatIf,
    };
  }
}

/**
 * msdynmkt_StartMigrationCustomAction response message
 */
export class msdynmkt_StartMigrationCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_StartMigrationCustomActionResponse) {
    super("msdynmkt_StartMigrationCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_StartMigrationCustomActionResponse {
    return new msdynmkt_StartMigrationCustomActionResponse((data as any).value);
  }
}
