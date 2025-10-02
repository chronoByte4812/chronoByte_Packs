import { Player, system, world } from "@minecraft/server";

/**
 * Execute a callback after a player moves
 * @param {Player} player 
 * @param {void} callbackWM 
 */
export function waitMove(player, callbackWM) {
    const map = new Map();

    map.set(player, [player.location.x, player.location.y, player.location.z]);

    const runId = system.runInterval(() => {
        for (const [oldPlayer, [oldX, oldY, oldZ]] of map) {
            const { x: newX, y: newY, z: newZ } = oldPlayer.location;

            if (newX !== oldX || newY !== oldY || newZ !== oldZ) {
                callbackWM();
                map.delete(oldPlayer);
                system.clearRun(runId);
            };
        };
    }, 5);
};