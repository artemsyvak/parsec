export type DNA_ITEM = {
    title: string,
    description: string
}


export type Project = {
    title: string,
    projectType: string,
    detailedInfoTitle: string,
    detailedInfoDescription: any,
    screenshots: any,
    videoUrl: any,
}

export type Client = {
    images: string[]
}

export type Teammate = {
    name: string,
    avatar: string,
    position: string,
}

export type Feedback = {
    name: string,
    position: string,
    avatar: string,
    company_avatar: string,
    feedbackText: string[],
}