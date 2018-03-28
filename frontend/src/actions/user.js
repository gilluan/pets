import { httpPost } from "../utils";

export const saveUser = (user) => {
  return dispatch => {
      console.log('saving user')
    return httpPost("/users", { user })
      .then(response => {
        let { error } = response;
        if (error) {
          console.log('error')
          //implementar actions de alerts
        } else {
            //implementar actions de success
          console.log('success', 'Usuario incrementado com sucesso')
        }
      });
  };
};
