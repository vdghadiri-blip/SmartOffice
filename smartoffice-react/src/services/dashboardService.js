import api from "../api/axios";

async function getStats() {

    const response =
        await api.get("/Dashboard/stats");

    return response.data;

}

async function getRecentLetters() {

    const response =
        await api.get("/Dashboard/recentletters");

    return response.data;

}

export default {

    getStats,

    getRecentLetters

}