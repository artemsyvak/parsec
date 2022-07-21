const SANITY_QUERY = {
    GET_SHOWREEL: `*[_type == "showreel"] {"videoSource": video.asset->url}`,
    GET_SERVICES: `*[_type == "service"] | order(_createdAt asc) {title, description, "videoSource":video.asset->url}`
}

export default SANITY_QUERY
