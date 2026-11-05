import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_cesinvoke action
 */
export interface msdyn_cesinvokeResponse {
  CESResult: string;
  IsSuccess: string;
}

/**
 * msdyn_cesinvoke action
 *
 * Unbound action
 */
export class msdyn_cesinvokeAction implements Executable<msdyn_cesinvokeResponse> {
  constructor(
    public readonly callType: string,
    public readonly eventName: string,
    public readonly surveyName: string
  ) {}

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
    return data as msdyn_cesinvokeResponse;
  }
}
