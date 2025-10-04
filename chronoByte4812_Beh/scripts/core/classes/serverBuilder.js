
import { system, world } from "@minecraft/server";
import { config } from "../config.js";

/**
 * A class for server functions and modules
 * Friday, 03 October 2025, 9:34 PM
 * Edited on Saturday, 04 October 2025, 8:15 PM
 */
class serverBuilder {
    constructor() {
        system.run(() => {
            this.allStaff = world.getAllPlayers().filter((player) => player.hasTag(config.staffTag));
            this.allDevs = world.getAllPlayers().filter((player) => player.hasTag(config.devTag));
            this.allPlayers = world.getAllPlayers();
            this.overworld = world.getDimension('overworld');
        });

        this.debugMode = config.debugMode;
    };

    /**
     * Send a message to all devs in the world
     * @param {String} message - The message to be sent to all staff members
     */
    msgDevs(message) {
        if (this.debugMode) {
            if (typeof message !== 'string') {
                // console.warn(`Invalid parameter parsed in msgDevs(). Got ${typeof message}`);
                serverBuild.msgDevs(`Invalid parameter parsed in msgDevs(). Got ${typeof message}`);

                return;
            };
        };

        this.allDevs.forEach((player) => {
            player.sendMessage(`§¶§8[§cDEBUG Broadcast§8]§d ${message}`);
        });

        // console.warn(`Dev length: ${this.allDevs.length}, Host plr name: ${this.allDevs[0].nameTag}, isaDev: ${this.allDevs[0].hasTag(config.devTag)}\n${message}`);
    };

    /**
     * Send a message to all staff members in the world
     * @param {String} message - The message to be sent to all staff members
     */
    msgStaff(message) {
        if (this.debugMode) {
            if (typeof message !== 'string') {
                // console.warn(`Invalid parameter type parsed in msgStaff(). Got ${typeof message}`);
                serverBuild.msgDevs(`Invalid parameter type parsed in msgStaff(). Got ${typeof message}`);

                return;
            };
        };

        this.allStaff.forEach((player) => {
            player.sendMessage(`§¶§8[§cStaff Broadcast§8]§d ${message}`);
        });
    };

    /**
     * Send a message to all players in the world
     * @param {String} message - The message to be sent to all staff members
     */
    msg(message) {
        if (this.debugMode) {
            if (typeof message !== 'string') {
                // console.warn(`Invalid parameter parsed in msgDevs(). Got ${typeof message}`);
                serverBuild.msgDevs(`Invalid parameter parsed in msgDevs(). Got ${typeof message}`);
            };
        };

        this.allPlayers.forEach((player) => {
            player.sendMessage(`§¶§8[§cBroadcast§8]§d ${message}`);
        });
    };
};

export const serverBuild = new serverBuilder();