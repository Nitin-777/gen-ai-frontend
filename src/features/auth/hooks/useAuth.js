import { useContext, useEffect } from "react";
import { login, register, logout, getMe } from "../services/auth.api";
import { AuthContext } from "../auth.context";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    // ✅ LOGIN
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });

            // 🔥 STORE TOKEN
            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            if (data?.user) {
                setUser(data.user);
                return true;
            }

            return false;
        } catch (err) {
            console.error("Login error:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // ✅ REGISTER
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            if (data?.user) {
                setUser(data.user);
                return true;
            }

            return false;
        } catch (err) {
            console.error(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // ✅ LOGOUT
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("token"); // 🔥 IMPORTANT
            setUser(null);
            navigate("/login");
            setLoading(false);
        }
    };

    // ✅ AUTO LOGIN
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const data = await getMe();

                if (data?.user) {
                    setUser(data.user);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (err) {
                console.error(err);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, [setUser, setLoading]);

    // 🔥 THIS WAS MISSING
    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};