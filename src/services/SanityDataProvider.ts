import { Project, Teammate, Feedback } from "../types"

type AWS_DATA_ITEM = {
    _id: string,
    title: string,
    fileURL: string,
}

type SERVICE = {
    title: string,
    description: string,
}

type SanityData = {
    awsMedia: AWS_DATA_ITEM[],
    services: SERVICE[],
    projects: Project[],
    clients: any[],
    team: Teammate[],
    feedbacks: Feedback[],

}

type dataKeyType = keyof SanityData

export const getDataByKey = (sanityData: SanityData, dataKey: dataKeyType) => {
    return sanityData[dataKey]
}

export const getShowreelSource = (sanityData: SanityData['awsMedia']) => {
    return sanityData.find((asset: AWS_DATA_ITEM) => asset.title === 'Showreel')
}