import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_BusinessClosureDelete request message
 *
 * Web API Action: msdyn_BusinessClosureDelete
 */
export class msdyn_BusinessClosureDeleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureDeleteResponse>
{
  constructor(public ids: string) {
    super("msdyn_BusinessClosureDelete");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureDelete`;

    const body: Record<string, unknown> = {
      Ids: this.ids,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureDeleteResponse> {
    const data = await response.json();
    return msdyn_BusinessClosureDeleteResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Ids: this.ids,
    };
  }
}

/**
 * msdyn_BusinessClosureDelete response message
 */
export class msdyn_BusinessClosureDeleteResponse extends OrganizationResponse {
  constructor(public result: msdyn_BusinessClosureDeleteResponse) {
    super("msdyn_BusinessClosureDelete");
  }

  static fromResponse(data: unknown): msdyn_BusinessClosureDeleteResponse {
    return new msdyn_BusinessClosureDeleteResponse((data as any).value);
  }
}
