import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="">
            {children}
        </div>
    );
}

export default AuthLayout;