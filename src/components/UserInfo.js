export class UserInfo {
  constructor({ professionElement, nameElement }) {
    this._profession = professionElement;
    this._name = nameElement;
   }

  getUserInfo() {
    const profileInfoObject = {};
    profileInfoObject.name = this._name.textContent;
    profileInfoObject.profession = this._profession.textContent;
    
    return profileInfoObject;
  }
  setUserInfo(profileName, profileProfession) {
    this._name.textContent = profileName;
    this._profession.textContent = profileProfession;
  }
}
