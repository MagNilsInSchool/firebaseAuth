import type { User } from "firebase/auth";
import React from "react";
interface Props {
    user: User | null;
    beanQuote: string;
}
const UserDisplay: React.FC<Props> = ({ user, beanQuote }) => {
    const beanquote = beanQuote ? `- "${beanQuote}"` : "";
    return (
        <article>
            <div>
                <img src={user?.photoURL ?? ""} alt="" />
                <h1>{user?.displayName}</h1>
                <h2>{user?.email}</h2>
            </div>
            <p>{beanquote}</p>
        </article>
    );
};

export default UserDisplay;
