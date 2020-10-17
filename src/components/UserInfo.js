export class UserInfo {
  constructor({ professionElement, nameElement,  }) {
    this._profession = professionElement;
    this._nameElement = nameElement;
   }

  getUserInfo() {
    const profileInfoObject = {};
    profileInfoObject.name = this._nameElement.textContent;
    profileInfoObject.profession = this._profession.textContent;
    
    return profileInfoObject;
  }
  setUserInfo(profileName, profileProfession) {
    this._nameElement.textContent = profileName;
    this._profession.textContent = profileProfession;
  }
}
