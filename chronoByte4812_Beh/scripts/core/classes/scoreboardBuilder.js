import { world, Player } from "@minecraft/server";
import { config } from "../config.js";
import { serverBuild } from "./serverBuilder.js";

/**
 * A class to manage world and player scoreboads
 * Thursday, 02 October 2025, 7:18 PM
 */
export class scoreboardBuilder {
    constructor() {
        system.run(() => {
            this.scoreboard = world.scoreboard;
        });
    };

    /**
     * Get a value from the worlds scoreboardBuild
     * @param {String} key 
     */
    get(key) {
        if (config.debugMode) {
            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in scoreboardBuild.get(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in scoreboardBuild.get(). Got ${typeof key}`);

                return;
            };
        };

        const value = world.getDynamicProperty(key);

        return value;
    };

    /**
     * Set a value from the world scoreboardBuild
     * @param {String} key 
     * @param {boolean | number | string | Vector3} value 
     */
    set(key, value) {
        if (config.debugMode) {
            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in scoreboardBuild.set(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in scoreboardBuild.set(). Got ${typeof key}`);

                return;
            }
            if (typeof value !== 'string') {
                // console.warn(`Invalid type parsed in scoreboardBuild.set(). Got ${typeof key}`);
                serverBuild.allDevs(`Invalid type parsed in scoreboardBuild.set(). Got ${typeof key}`);

                return;
            };
        };

        world.setDynamicProperty(key, value);
    };

    /**
     * Get a value a player's scoreboardBuild
     * @param {Player} player
     * @param {String} key
     */
    getPlayer(player, key) {
        if (config.debugMode) {
            if (!player) {
                // console.warn(`Missing player param parsed in scoreboardBuild.getPlayer(). Got ${typeof player}`)
                serverBuild.msgDevs(`Missing player param parsed in scoreboardBuild.getPlayer(). Got ${typeof player}`)
            };
            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in scoreboardBuild.getPlayer(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in scoreboardBuild.getPlayer(). Got ${typeof key}`);
            }
        };

        const value = player.getDynamicProperty(key);

        return value;
    };

    /**
     * Set a value from a player's scoreboardBuild
     * @param {Player} player
     * @param {String} key
     * @param {boolean | number | string | Vector3} value
     */
    setPlayer(player, key, value) {
        if (config.debugMode) {
            if (!player) {
                // console.warn(`Missing player param parsed in scoreboardBuild.setPlayer(). Got ${typeof player}`);
                serverBuild.msgDevs(`Missing player param parsed in scoreboardBuild.setPlayer(). Got ${typeof player}`);

                return;
            };

            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in scoreboardBuild.setPlayer(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in scoreboardBuild.setPlayer(). Got ${typeof key}`);

                return;
            };
        };

        player.setDynamicProperty(key, value);
    };
};

export const scoreboardBuild = new scoreboardBuilder();