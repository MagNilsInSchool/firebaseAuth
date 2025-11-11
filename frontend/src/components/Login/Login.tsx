import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, type User } from "firebase/auth";
import { app } from "../../firebase/firebase.init";

interface Props {
    user: User | null;
    setUser: (user: User | null) => void;
    setBeanQuote: (quote: string) => void;
}
const Login: React.FC<Props> = ({ user, setUser, setBeanQuote }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const loggedInUser = result.user;

            const token = await loggedInUser.getIdToken(true);

            sessionStorage.setItem("token", token);
            sessionStorage.setItem("user", JSON.stringify(loggedInUser));

            setUser(loggedInUser);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error during sign-in:", error.message);
            } else {
                console.error(error);
            }
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error during sign-in:", error.message);
            } else {
                console.error(error);
            }
        }
    };

    const fetchSecureData = async () => {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error("No user is signed in.");
                return;
            }

            const token = await currentUser.getIdToken(true);

            // sessionStorage.setItem("token", token);

            const response = await fetch("http://localhost:1338/secure-data", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBeanQuote(data);
            } else {
                console.log("Failed to fetch secure data:", response.status);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching data:", error.message);
            } else {
                console.error(error);
            }
        }
    };
    return user ? (
        <>
            <button onClick={handleSignOut}>Sign out</button>
            <button onClick={fetchSecureData}>Fetch data</button>
        </>
    ) : (
        <button onClick={handleGoogleSignIn}>Google login</button>
    );
};

export default Login;
