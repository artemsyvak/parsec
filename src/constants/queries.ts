const SANITY_QUERY = {
    GET_AWS_MEDIA: `*[_type == "s3-dam.storedFile"]`,
    GET_SERVICES: `*[_type == "service"] | order(_createdAt asc) {title, description}`,
    GET_PROJECTS: `*[_type == "project"] | order(_createdAt asc) {
        title, 
        projectType,
        detailedInfoTitle,
        'detailedInfoDescription': detailedInfoDescription[].children[].text,
        'screenshots': screenshots[].asset->url
    }`
}

export default SANITY_QUERY
