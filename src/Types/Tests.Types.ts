export interface ITest {
    testId: number;
    testName: string;
    labelType: string;
    manufacturingDate: Date;
    batchNum: string;
    boxNum: string;
    incubatorTemp: number;
    isTestInProgress: boolean;
    activationDate: string;
    machineNum?: string;
    deactivationDate?: string;
    volume?: number;
    comments?: string;
}
export interface IScan {
    testID?: string;
    date: string;
    barCode: string;
}
