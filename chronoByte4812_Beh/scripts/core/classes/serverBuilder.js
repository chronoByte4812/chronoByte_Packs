
import { system, world } from "@minecraft/server";
import { config } from "../config.js";

/**
 * A class for server functions and modules
 * Friday, 03 October 2025, 9:34 PM
 * Edited on 04 October 2025, 10:35 AM
 */
class serverBuilder {
    constructor() {
        system.run(() => {
            this.allStaff = world.getPlayers({ tags: [config.staffTag] });
            this.allDevs = world.getPlayers({ tags: [config.devTag] });
            this.allPlayers = world.getAllPlayers();
            this.overworld = world.getDimension('overworld');
        });

        this.debugMode = config.debugMode;
    };

    /**
     * Send a message to all staff members in the world
     * @param {String} message - The message to be sent to all staff members
     */
    msgStaff(message) {
        if (this.debugMode) {
            if (typeof message !== 'string') {
                console.warn(`Invalid parameter type parsed in msgStaff(). Got ${typeof message}`);
            };
        };

        this.allStaff.forEach((player) => {
            player.sendMessage(message);
        });
    };

    /**
     * Send a message to all devs in the world
     * @param {String} message - The message to be sent to all staff members
     */
    msgDevs(message) {
        if (this.debugMode) {
            if (typeof message !== 'string') {
                console.warn(`Invalid parameter parsed in msgDevs(). Got ${typeof message}`);
            };
        };

        this.allDevs.forEach((player) => {
            player.sendMessage(message);
        });
    };

    /**
     * Send a message to all players in the world
     * @param {String} message - The message to be sent to all staff members
     */
    msg(message) {
        if (this.debugMode) {
            if (typeof message !== 'string') {
                console.warn(`Invalid parameter parsed in msgDevs(). Got ${typeof message}`);
            };
        };

        this.allPlayers.forEach((player) => {
            player.sendMessage(message);
        });
    };
};

export const serverBuild = new serverBuilder();