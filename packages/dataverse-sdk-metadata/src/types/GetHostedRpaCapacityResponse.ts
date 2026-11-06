/**
 * GetHostedRpaCapacityResponse
 */
export interface GetHostedRpaCapacityResponse {
  availableCapacity?: number;
  failedToGetCapacity?: boolean;
  hostedGroupCount?: number;
  hostedMachineCount?: number;
  hostedMachineGroupsBotCount?: number;
  isPayGo?: boolean;
  totalEnvironmentAddOns?: number;
}
