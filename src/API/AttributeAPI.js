import { $authhost, $host } from "./index"

export const createAttribute = async(attribute) => {
    const {data} = await $host.post('api/attribute', attribute)
    return data
}

export const updateAttribute = async(id, attribute) => {
    const {data} = await $host.put('api/attribute/' + id, attribute)
    return data
}

export const deleteAttribute = async(id) => {
    const {data} = await $host.delete('api/attribute/' + id)
    return data
}

export const fetchAttributes = async() => {
    const {data} = await $host.get('api/attribute')
    return data
}

export const getAttribute = async(id) => {
    const {data} = await $host.get('api/attribute/' + id)
    return data
}


//AttributeGroup
export const createAttributeGroup = async(attributeGroup) => {
    const {data} = await $host.post('api/attribute_group', attributeGroup)
    return data
}

export const updateAttributeGroup = async(id, attributeGroup) => {
    const {data} = await $host.put('api/attribute_group/' + id, attributeGroup)
    return data
}

export const deleteAttributeGroup = async(id) => {
    const {data} = await $host.delete('api/attribute_group/' + id)
    return data
}

export const fetchAttributeGroups = async() => {
    const {data} = await $host.get('api/attribute_group')
    return data
}

export const getAttributeGroup = async(id) => {
    const {data} = await $host.get('api/attribute_group/' + id)
    return data
}