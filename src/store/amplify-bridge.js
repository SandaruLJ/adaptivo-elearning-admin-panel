import { Auth, Hub } from "aws-amplify";
import { authActions } from "./auth-slice";

export default class AmplifyBridge {
    constructor(store) {
        this.store = store;

        this.onHubCapsule = this.onHubCapsule.bind(this);
        Hub.listen('auth', this, 'AmplifyBridge');

        this.checkUser();
    }

    onHubCapsule(capsule) {
        this.checkUser();
    }

    checkUser() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                this.store.dispatch(authActions.setUser(user));
                this.store.dispatch(this.loadProfile(user));
            })
            .catch(err => {
                this.store.dispatch(authActions.setUser(null));
                this.store.dispatch(authActions.deleteProfile)
            })
    }

    loadProfile(user) {
        Auth.userAttributes(user)
            .then(data => {
                const profile = this.translateAttributes(data);
                this.store.dispatch(authActions.updateProfile(profile));
            })
            .catch(err => this.store.dispatch(authActions.deleteProfile()));
    }
}