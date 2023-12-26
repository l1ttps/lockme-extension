import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";

const Root = () => {
    const password = useAppSelector(state => state.password.hash)
    const redirect = password ? "/settings" : "/welcome";
    return (
        <Navigate to={redirect} replace={true} />
    );
};

export default Root;