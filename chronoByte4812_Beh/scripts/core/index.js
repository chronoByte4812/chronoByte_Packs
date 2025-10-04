import { system, world } from '@minecraft/server';
import { commandBuild } from './classes/commandBuilder.js';
import { config } from './config.js';
import { waitMove } from './utils/waitMove.js';
import '../commands/commandsImport.js';
import { serverBuild } from './classes/serverBuilder.js';

world.beforeEvents.chatSend.subscribe((data) => {
    if (!data.message.startsWith(config.prefix) || data.message === config.prefix) return; data.cancel = true;

    const args = data.message.slice(config.prefix.length).trim().split(new RegExp(/\s+/g));
    const sender = data.sender;
    const cmd = args.shift();
    const command = commandBuild.getCommand(cmd);

    if (config.debugMode) {
        // console.warn(`Player ${sender.nameTag}, Cmd ${cmd} does ${command !== undefined ? '' : 'not '}exists, Args ${args.join(', ')}`);
        serverBuild.msgDevs(`Player ${sender.nameTag}, Cmd ${cmd} does ${command !== undefined ? '' : 'not '}exists, Args ${args.join(', ')}`)
    };

    if (!command)
        return sender.sendMessage(`§cThe command §f${cmd}§c was not found`);
    
    if (command.for_staff === true && sender.hasTag(config.staffTag) === false)
        return sender.sendMessage(`§cThe command §f${cmd}§c is for staff only`);

    system.run(() => {
        command.callback(data, args);
        waitMove(sender, () => command.callbackWM(data, args));
    });
});//