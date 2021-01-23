import { v1 as uuid } from 'uuid'
import request from 'request'

const apiUrl = 'https://authserver.mojang.com'

module.exports.getAuth = function (username: string, password: string) {
  return new Promise((resolve, reject) => {
    const requestObject = {
      url: apiUrl + '/authenticate',
      json: {
        agent: {
          name: 'Minecraft',
          version: 1
        },
        username: username,
        password: password,
        clientToken: uuid(),
        requestUser: true
      }
    }

    request.post(requestObject, function (error, response, body) {
      if (error) return reject(error)
      if (!body || !body.selectedProfile) {
        return reject(new Error('Validation error: ' + response.statusMessage))
      }

      const userProfile = {
        access_token: body.accessToken,
        client_token: body.clientToken,
        uuid: body.selectedProfile.id,
        name: body.selectedProfile.name,
        selected_profile: body.selectedProfile,
        user_properties: JSON.stringify(body.user.properties || {})
      }

      resolve(userProfile)
    })
  })
}
