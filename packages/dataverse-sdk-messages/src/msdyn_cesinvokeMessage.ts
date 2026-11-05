import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_cesinvoke request message
 *
 * Web API Action: msdyn_cesinvoke
 */
export class msdyn_cesinvokeRequest
  extends OrganizationRequest
  implements Executable<msdyn_cesinvokeResponse>
{
  constructor(
    public callType: string,
    public eventName: string,
    public surveyName: string
  ) {
    super("msdyn_cesinvoke");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cesinvoke`;

    const body: Record<string, unknown> = {
      CallType: this.callType,
      EventName: this.eventName,
      SurveyName: this.surveyName,
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

  async parseResponse(response: Response): Promise<msdyn_cesinvokeResponse> {
    const data = await response.json();
    return msdyn_cesinvokeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CallType: this.callType,
      EventName: this.eventName,
      SurveyName: this.surveyName,
    };
  }
}

/**
 * msdyn_cesinvoke response message
 */
export class msdyn_cesinvokeResponse extends OrganizationResponse {
  constructor(public result: msdyn_cesinvokeResponse) {
    super("msdyn_cesinvoke");
  }

  static fromResponse(data: unknown): msdyn_cesinvokeResponse {
    return new msdyn_cesinvokeResponse((data as any).value);
  }
}
