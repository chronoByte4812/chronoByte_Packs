import { system, world } from "@minecraft/server";
import { config } from "../config";
import { serverBuild } from "../classes/serverBuilder.js";

/**
 * Execute a callback after a player moves
 * @param {import('@minecraft/server').Player} player 
 * @param {function() => void} callbackWM
 */
export function waitMove(player, callbackWM) {
    const map = new Map();
    const debugMode = config.debugMode;

    map.set(player, [player.location.x, player.location.y, player.location.z]);

    if (debugMode) {
        console.warn(`Player ${player.nameTag} is now awaiting movement waitMove()`);
        serverBuild.msgDevs(`Player ${player.nameTag} is now awaiting movement waitMove()`);
    };

    const runId = system.runInterval(() => {
        for (const [oldPlayer, [oldX, oldY, oldZ]] of map) {
            const { x: newX, y: newY, z: newZ } = oldPlayer.location;

            if (newX !== oldX || newY !== oldY || newZ !== oldZ) {
                callbackWM();
                map.delete(oldPlayer);
                system.clearRun(runId);

                if (debugMode) {
                    console.warn(`Player ${player.nameTag} finished waitMove()`);
                };
            };
        };
    }, 4);
};