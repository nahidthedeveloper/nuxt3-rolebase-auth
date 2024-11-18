import {getToken} from '#auth'

export default eventHandler(async (event) => {
    const session = await getToken({event})

    return session || 'no token present'
})