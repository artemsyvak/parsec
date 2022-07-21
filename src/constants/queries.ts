const SANITY_QUERY = {
    GET_SERVICES: `*[_type == "service"] | order(_createdAt asc) {title, description}`
}

export default SANITY_QUERY
