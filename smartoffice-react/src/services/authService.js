const authService = {
    getToken() {
        return localStorage.getItem("token");
    },

    getUsername() {
        return localStorage.getItem("username");
    },

    getRole() {
        return localStorage.getItem("role");
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    },
};

export default authService;