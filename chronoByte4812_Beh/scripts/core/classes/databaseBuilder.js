import { world, Player } from "@minecraft/server";
import { config } from "../config.js";
import { serverBuild } from './serverBuilder.js'

/**
 * A class to manage world and player dynamic properties
 * Sunday, 22 June 2025, 6:58 AM AEST
 * Edited Thursday, 02 October 2025, 7:27 PM AEST
 */
export class databaseBuilder {
    constructor() {

    };

    /**
     * Get a value from the worlds Database
     * @param {String} key 
     */
    get(key) {
        if (config.debugMode) {
            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in Database.get(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in Database.get(). Got ${typeof key}`);
                return;
            };
        };

        const value = world.getDynamicProperty(key);

        return value;
    };

    /**
     * Set a value from the world Database
     * @param {String} key 
     * @param {boolean | number | string} value 
     */
    set(key, value) {
        if (config.debugMode) {
            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in Database.set(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in Database.set(). Got ${typeof key}`);

                return;
            };
        };

        world.setDynamicProperty(key, value);
    };

    /**
     * Get a value a player's Database
     * @param {Player} player
     * @param {String} key
     */
    getPlayer(player, key) {
        if (config.debugMode) {
            if (!player) {
                // console.warn(`Missing player param in Database.getPlayer(). Got ${typeof player}`);
                serverBuild.msgDevs(`Missing player param in Database.getPlayer(). Got ${typeof player}`);
                return;
            };
            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in Database.getPlayer(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in Database.getPlayer(). Got ${typeof key}`);
            };
        };

        const value = player.getDynamicProperty(key);

        return value;
    };

    /**
     * Set a value from a player's Database
     * @param {Player} player
     * @param {String} key
     * @param {boolean | number | string} value
     */
    setPlayer(player, key, value) {
        if (config.debugMode) {
            if (!player) {
                // console.warn(`Missing player param in Database.setPlayer(). Got ${typeof player}`);
                serverBuild.msgDevs(`Missing player param in Database.setPlayer(). Got ${typeof player}`);

                return;
            };

            if (typeof key !== 'string') {
                // console.warn(`Invalid type parsed in Database.setPlayer(). Got ${typeof key}`);
                serverBuild.msgDevs(`Invalid type parsed in Database.setPlayer(). Got ${typeof key}`);
                
                return;
            };
        };

        player.setDynamicProperty(key, value);
    };
};

export const Database = new databaseBuilder();