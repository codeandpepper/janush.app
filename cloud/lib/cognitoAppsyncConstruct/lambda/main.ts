import { listUsers } from "./listUsers/listUsers";

interface User {
  email: string;
}

type AppSyncEvent = {
  info: {
    fieldName: string;
    selectionSetList: string[];
  };
  // arguments: {
  //   userId: string;
  //   user: User;
  // };
};

exports.handler = async (event: AppSyncEvent) => {
  console.log("EVENT", event);
  switch (event.info.fieldName) {
    case "users":
      return listUsers(event.info.selectionSetList);
    default:
      return null;
  }
};
