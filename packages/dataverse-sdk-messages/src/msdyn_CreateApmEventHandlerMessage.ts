import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateApmEventHandler request message
 *
 * Web API Action: msdyn_CreateApmEventHandler
 */
export class msdyn_CreateApmEventHandlerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateApmEventHandlerResponse>
{
  constructor(public appModuleId: string) {
    super("msdyn_CreateApmEventHandler");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateApmEventHandler`;

    const body: Record<string, unknown> = {
      AppModuleId: this.appModuleId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateApmEventHandlerResponse> {
    const data = await response.json();
    return msdyn_CreateApmEventHandlerResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AppModuleId: this.appModuleId,
    };
  }
}

/**
 * msdyn_CreateApmEventHandler response message
 */
export class msdyn_CreateApmEventHandlerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateApmEventHandlerResponse) {
    super("msdyn_CreateApmEventHandler");
  }

  static fromResponse(data: unknown): msdyn_CreateApmEventHandlerResponse {
    return new msdyn_CreateApmEventHandlerResponse((data as any).value);
  }
}
