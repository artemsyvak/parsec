const SANITY_QUERY = {
    GET_AWS_MEDIA: `*[_type == "s3-dam.storedFile"] {title, fileURL, _id}`,
    GET_SERVICES: `*[_type == "service"] | order(_createdAt asc) {title, description, videoId}`,
    GET_PROJECTS: `*[_type == "project"] | order(_createdAt asc) {
        title, 
        projectType,
        serviceType,
        detailedInfoTitle,
        videoId,
        'detailedInfoDescription': detailedInfoDescription[].children[].text,
        'screenshots': screenshots[].asset->url
    }`,
    GET_CLIENTS: `*[_type == "clients"] | order(_createdAt asc) {'images': images[].asset->url}`,
    GET_TEAM: `*[_type == "team"] | order(_createdAt asc) {name, position, 'avatar': avatar.asset->url}`,
    GET_FEEDBACKS: `*[_type == "feedbacks"] | order(_createdAt asc) {
        name,
        position,
        'avatar': avatar.asset->url,
        'company_avatar': avatar.asset->url,
        'feedbackText': feedbackText[].children[].text
        }`
}

export default SANITY_QUERY
