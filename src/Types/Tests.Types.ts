export interface IScan {
    date: string;
    barCode: string;
    round: string;
}
export interface IExperiment {
    _id: string;
    setSize: number;
    experimentOwner: string;
    experimentOrganization: string;
    experimentName: string;
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
    scans: IScan[];
}
