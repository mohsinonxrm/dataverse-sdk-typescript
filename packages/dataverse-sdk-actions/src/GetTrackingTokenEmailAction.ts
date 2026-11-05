import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetTrackingTokenEmail action
 */
export interface GetTrackingTokenEmailResponse {
  TrackingToken: string;
}

/**
 * GetTrackingTokenEmail action
 *
 * Unbound action
 */
export class GetTrackingTokenEmailAction implements Executable<GetTrackingTokenEmailResponse> {
  constructor(public readonly subject: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetTrackingTokenEmail`;

    const body: Record<string, unknown> = {
      Subject: this.subject,
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

  async parseResponse(response: Response): Promise<GetTrackingTokenEmailResponse> {
    const data = await response.json();
    return data as GetTrackingTokenEmailResponse;
  }
}
