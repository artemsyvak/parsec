import { Project, Teammate, Feedback } from "../types"

type AWS_DATA_ITEM = {
    title: string,
    fileURL: string
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

const SERVICE_AWS_TITLES = ['Музичні відео', 'Рекламні відео', 'Анімаційні відео']

export const getDataByKey = (sanityData: SanityData, dataKey: dataKeyType) => {
    return sanityData[dataKey]
}

export const getShowreelSource = (sanityData: SanityData['awsMedia']) => {
    return sanityData.find((asset: AWS_DATA_ITEM) => asset.title === 'Showreel')
}

export const getServiceSources = (sanityData: SanityData['awsMedia']) => {
    const serviceSources = sanityData
        .filter((asset: AWS_DATA_ITEM) => SERVICE_AWS_TITLES.includes(asset.title))
    return serviceSources
}