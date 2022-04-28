import '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, UserCredential, User, Auth, getAuth } from 'firebase/auth';

export type UserStateType = [
    user: User | null,
    setUser: (user: User | null) => any
]

export class AuthController {

    auth: Auth;
    provider: GoogleAuthProvider;
    userState: UserStateType;

    constructor(userState: UserStateType) {
        this.auth = getAuth();
        this.provider = new GoogleAuthProvider();
        this.userState = userState;
    }

    login() {
        signInWithPopup(this.auth, this.provider)
            .then((result: UserCredential) => {
                this.userState[1](result.user);
            }).catch((error: any) => {
                alert(error);
            })
    }

    logout() {
        signOut(this.auth).then(() => {
            this.userState[1](null);
        }).catch(error => {
            alert(error)
        })
    }

}