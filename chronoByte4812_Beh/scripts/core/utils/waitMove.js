import { Player, system, world } from "@minecraft/server";

/**
 * Execute a callback after a player moves
 * @param {Player} player 
 * @param {void} callbackWM 
 */
export function waitMove(player, callbackWM) {
    const map = new Map();
    const currentlyDebugMode = config.debugMode;

    map.set(player, [player.location.x, player.location.y, player.location.z]);

    if (currentlyDebugMode) {
        console.warn(`Player ${player.nameTag} is now awaiting movement waitMove()`);
    };

    const runId = system.runInterval(() => {
        for (const [oldPlayer, [oldX, oldY, oldZ]] of map) {
            const { x: newX, y: newY, z: newZ } = oldPlayer.location;

            if (newX !== oldX || newY !== oldY || newZ !== oldZ) {
                callbackWM();
                map.delete(oldPlayer);
                system.clearRun(runId);

                if (currentlyDebugMode) {
                    console.warn(`Player ${player.nameTag} has moved movement waitMove()`);
                };
            };
        };
    }, 4);
};