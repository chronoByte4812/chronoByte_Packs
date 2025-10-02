import { world, Vector3, Player } from "@minecraft/server";
import { config } from "../config.js";

/**
 * A class to manage world and player dynamic properties
 * Sunday, 22 June 2025, 6:58 AM
 */
export class databaseBuilder {
    constructor() {

    };

    /**
     * Get a value from the worlds Database
     * @param {String} key 
     */
    get(key) {
        if (config.debugMode === true) {
            if (typeof key !== 'string') return console.warn(`Invalid type parsed in Database.get(). Got ${typeof key}`);
        };

        const value = world.getDynamicProperty(key);

        return value;
    };

    /**
     * Set a value from the world Database
     * @param {String} key 
     * @param {boolean | number | string | Vector3} value 
     */
    set(key, value) {
        if (config.debugMode === true) {
            if (typeof key !== 'string') return console.warn(`Invalid type parsed in Database.set(). Got ${typeof key}`);
        };

        world.setDynamicProperty(key, value);
    };

    /**
     * Get a value a player's Database
     * @param {Player} player
     * @param {String} key
     */
    getPlayer(player, key) {
        if (config.debugMode === true) {
            if (!player) return console.warn(`Missing player param parsed in Database.getPlayer(). Got ${typeof player}`)
            if (typeof key !== 'string') return console.warn(`Invalid type parsed in Database.getPlayer(). Got ${typeof key}`);
        };

        const value = player.getDynamicProperty(key);

        return value;
    };

    /**
     * Set a value from a player's Database
     * @param {Player} player
     * @param {String} key
     * @param {boolean | number | string | Vector3} value
     */
    setPlayer(player, key, value) {
        if (config.debugMode === true) {
            if (!player) return console.warn(`Missing player param parsed in Database.setPlayer(). Got ${typeof player}`)
            if (typeof key !== 'string') return console.warn(`Invalid type parsed in Database.setPlayer(). Got ${typeof key}`);
        };

        player.setDynamicProperty(key, value);
    };
};

export const Database = new databaseBuilder();