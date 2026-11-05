import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfWorkOrderGeneratedFromABS action
 */
export interface msdyn_CheckIfWorkOrderGeneratedFromABSResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckIfWorkOrderGeneratedFromABS action
 *
 * Unbound action
 */
export class msdyn_CheckIfWorkOrderGeneratedFromABSAction implements Executable<msdyn_CheckIfWorkOrderGeneratedFromABSResponse> {
  constructor(public readonly timeInterval: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkOrderGeneratedFromABS`;

    const body: Record<string, unknown> = {
      TimeInterval: this.timeInterval,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfWorkOrderGeneratedFromABSResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfWorkOrderGeneratedFromABSResponse;
  }
}
