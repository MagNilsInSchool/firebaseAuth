import { useEffect, useRef, useState } from "react";
import Login from "./components/Login/Login";
import type { User } from "firebase/auth";
import UserDisplay from "./components/UserDisplay/UserDisplay";

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [beanQuote, setBeanQuote] = useState("");
    const isInitalRender = useRef(true);

    useEffect(() => {
        if (isInitalRender.current === true) {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        }
        isInitalRender.current = false;
    }, [setUser]);

    return (
        <>
            {user && <UserDisplay user={user} beanQuote={beanQuote} />}
            <Login user={user} setUser={setUser} setBeanQuote={setBeanQuote} />
        </>
    );
}

export default App;
