const fetch = require("node-fetch");
const errorCodes = require("./errorCodes");

const hypixelApiEndpoints = [
    "player",
    "recentgames",
    "status",
    "guild",
    "resources/games",
    "resources/achievements",
    "resources/challenges",
    "resources/quests",
    "resources/guilds/achievements",
    "resources/vanity/pets",
    "resources/vanity/companions",
    "resources/skyblock/collections",
    "resources/skyblock/skills",
    "resources/skyblock/items",
    "resources/skyblock/election",
    "resources/skyblock/bingo",
    "skyblock/news",
    "skyblock/auction",
    "skyblock/auctions",
    "skyblock/auctions_ended",
    "skyblock/bazaar",
    "skyblock/profile",
    "skyblock/profiles",
    "skyblock/museum",
    "skyblock/bingo",
    "skyblock/firesales",
    "boosters",
    "counts",
    "leaderboards",
    "punishmentstats",
];

class HypixelAPI {
    constructor(apiKey) {
        if (typeof apiKey != "string")
            throw new TypeError(errorCodes.InvalidApiKey);
        this.ApiKey = apiKey;
        this.TestAPIKey();
    }

    GetPlayerData(uuid) {
        if (typeof uuid != "string")
            throw new TypeError(errorCodes.InvalidFields);
        return this.FetchHypixelAPIEndpoint("player", { uuid: uuid });
    }

    GetPlayerRecentGames(uuid) {
        if (typeof uuid != "string")
            throw new TypeError(errorCodes.InvalidFields);
        return this.FetchHypixelAPIEndpoint("recentgames", { uuid: uuid });
    }

    GetStatus(uuid) {
        if (typeof uuid != "string")
            throw new TypeError(errorCodes.InvalidFields);
        return this.FetchHypixelAPIEndpoint("status", { uuid: uuid });
    }

    GetGuild(options = {}) {
        if (
            typeof options.id != "string" &&
            typeof options.player != "string" &&
            typeof options.name != "string"
        )
            throw new TypeError(errorCodes.InvalidFields);
        return this.FetchHypixelAPIEndpoint("guild", options);
    }

    GetHypixelGames() {
        return this.FetchHypixelAPIEndpoint("resources.games", {}, false);
    }

    GetHypixelAchievements() {
        return this.FetchHypixelAPIEndpoint(
            "resources.achievements",
            {},
            false
        );
    }

    GetHypixelChallenges() {
        return this.FetchHypixelAPIEndpoint("resources.challenges", {}, false);
    }

    GetHypixelQuests() {
        return this.FetchHypixelAPIEndpoint("resources.quests", {}, false);
    }

    GetHypixelGuildAchievements() {
        return this.FetchHypixelAPIEndpoint(
            "resoucres.guilds.achievements",
            {},
            false
        );
    }

    GetVanityPets() {
        return this.FetchHypixelAPIEndpoint("resources.vanity.pets", {}, false);
    }

    GetVanityCompanions() {
        return this.FetchHypixelAPIEndpoint(
            "resources.vanity.companions",
            {},
            false
        );
    }

    GetSkyblockCollections() {
        return this.FetchHypixelAPIEndpoint(
            "resources.skyblock.collections",
            {},
            false
        );
    }

    GetSkyblockSkills() {
        return this.FetchHypixelAPIEndpoint(
            "resources.skyblock.skills",
            {},
            false
        );
    }

    GetSkyblockItems() {
        return this.FetchHypixelAPIEndpoint(
            "resources.skyblock.items",
            {},
            false
        );
    }

    GetSkyblockElection() {
        return this.FetchHypixelAPIEndpoint(
            "resources.skyblock.election",
            {},
            false
        );
    }

    GetCurrentSkyblockEvent() {
        return this.FetchHypixelAPIEndpoint(
            "resoucres.skyblock.bingo",
            {},
            false
        );
    }

    GetSkyblockNews() {
        return this.FetchHypixelAPIEndpoint("skyblock.news");
    }

    GetPlayerAuctions(options = {}) {
        if (
            typeof options.uuid != "string" &&
            typeof options.player != "string" &&
            typeof options.profile != "string"
        )
            throw new TypeError(errorCodes.MissingFields);
            return this.FetchHypixelAPIEndpoint("skyblock.auction", options);
    }
    
    GetCurrentAuctions(page) {
        page = page || 0;
        if (typeof page != "number") throw new TypeError(errorCodes.InvalidFields);
        return this.FetchHypixelAPIEndpoint("skyblock.auctions", {page:page}, false);
    }

    GetRecentEndedAuctions() {
        return this.FetchHypixelAPIEndpoint("skyblock.auctions-ended", {}, false);
    }

    GetBazaarStats() {
        return this.FetchHypixelAPIEndpoint("skyblock.bazaar", {}, false);
    }

    GetSkyblockProfile(profileUUID) {
        if (typeof profileUUID != "string") throw new TypeError(errorCodes.MissingFields);
        return this.FetchHypixelAPIEndpoint("skyblock.profile", {profile:profileUUID});
    }


    GetPlayerSkyblockProfiles(uuid) {
        if (typeof uuid != "string") throw new TypeError(errorCodes.MissingFields);
        return this.FetchHypixelAPIEndpoint("skyblock.profiles",{uuid: uuid});
    }

    GetMuseumByProfile(profileUUID) {
        if (typeof profileUUID != "string") throw new TypeError(errorCodes.MissingFields);
        return this.FetchHypixelAPIEndpoint("skyblock.museum",{profile:profileUUID});
    }

    GetBingoData(uuid) {
        if (typeof uuid != "string") throw new TypeError(errorCodes.MissingFields);
        return this.FetchHypixelAPIEndpoint("skyblock.bingo", {uuid: uuid});
    }

    SkyblockFireSales() {
        return this.FetchHypixelAPIEndpoint("skyblock.firesales", {}, false);
    }

    GetNetworkBoosters() {
        return this.FetchHypixelAPIEndpoint("boosters");
    }

    GetPlayerCount() {
        return this.FetchHypixelAPIEndpoint("counts");
    }

    GetLeaderboard() {
        return this.FetchHypixelAPIEndpoint("leaderboards");
    }

    GetPunishmentStats() {
        return this.FetchHypixelAPIEndpoint("punishments");
    }

    async TestAPIKey() {
        try {
            this.FetchHypixelAPIEndpoint("skyblock.news");
        } catch {
            throw new Error(
                "Either an invalid key was provided, or key throttled. Do not spam restarting the process or this error may keep showing up."
            );
        }
    }

    CheckHypixelAPIDataStatus(res) {
        if (res.status == 200) {
            return res;
        } else if (res.status == 400) {
            throw new TypeError(errorCodes.MissingFields);
        } else if (res.status == 403) {
            throw new TypeError(errorCodes.InvalidApiKey);
        } else if (res.status == 429) {
            throw new Error(errorCodes.RateLimited);
        } else if (res.status == 422) {
            throw new TypeError("Malformed arguments");
        } else if (res.status == 503) {
            throw new Error("Hypixel API down. Try requests again in a few minutes");
        }
    }

    async FetchHypixelAPIEndpoint(
        endpoint,
        extraData,
        requireApiKey = true
    ) {
        if (typeof endpoint != "string")
            throw new TypeError(errorCodes.MissingFields);
        let baseUrl = "https://api.hypixel.net/v2/";
        let endpointUrl = endpoint.replaceAll(".", "/").replaceAll("-", "_");
        if (endpointUrl.endsWith("/"))
            throw new TypeError(
                errorCodes.EndpointInvalid(
                    endpointUrl,
                    '"." is not expected in the end of the URL.'
                )
            );
        if (!hypixelApiEndpoints.includes(endpointUrl))
            throw new TypeError(errorCodes.EndpointInvalid(endpointUrl));

        let datax = "";
        if (extraData && Object.keys(extraData).length && Object.keys(extraData).length > 0) {
            datax = datax + "?";

            for (const x of Object.keys(extraData)) {
                if (Object.keys(extraData)[0] !== x) {
                    datax += "&";
                } else {
                    datax += `${x}=${extraData[x]}`;
                }
            }
        }

        let data;
        if (requireApiKey) {
            data = await fetch(baseUrl + endpointUrl + datax, {
                headers: { "Api-Key": this.ApiKey },
            }).then(this.CheckHypixelAPIDataStatus).then( r => r.json() );
        } else {
            data = await fetch(baseUrl + endpointUrl + datax).then(
                this.CheckHypixelAPIDataStatus
            ).then( r => r.json() );
        }

        return data;
    }
}

exports.HypixelAPI = HypixelAPI;