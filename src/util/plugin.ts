import type { App } from '@slack/bolt';
import { promises as fs } from 'fs';
import { join } from 'path';
import _debug from 'debug';

const debug = _debug('plugins');

/**
 * A handy function that prefixes any ID string you
 * give it with your plugin's slug
 */
type PrefixFunction = (id:string) => string;

/**
 * The JSON metadata file for your plugin
 */
interface PluginJSON {
  name: string,
  version: string,
  slug: string,
}

type PluginFunction = (app:App, pre:PrefixFunction) => Promise<void>;

interface Plugin {
  json: PluginJSON,
  func: PluginFunction
}

// Some TypeScript wizardy that dynamically loads plugins
async function loadPlugins(app:App) {
  debug('Loading plugins...');

  const pluginFolders:string[] = await fs.readdir(join(__dirname, '..', 'plugins'));
  const loadPromises = [];

  for (let i = 0; i < pluginFolders.length; i += 1) {
    const pluginPath = `../plugins/${pluginFolders[i]}`;
    loadPromises.push((async () => {
      const json:PluginJSON = JSON.parse((await fs.readFile(join(__dirname, pluginPath, 'plugin.json'))).toString());
      const func:PluginFunction = (await import(`${pluginPath}/plugin`)).default;
      return { json, func };
    })());
  }
  const plugins:Plugin[] = await Promise.all(loadPromises);
  const pluginPromises = [];
  for (let i = 0; i < plugins.length; i += 1) {
    const plugin = plugins[i];
    const pre:PrefixFunction = (id) => `${plugin.json.slug}_${id}`;
    pluginPromises.push(plugin.func(app, pre).then(() => {
      debug(`[${i + 1}/${plugins.length}] "${plugin.json.name}" v${plugin.json.version} loaded.`);
    }));
  }
  await Promise.all(pluginPromises);
  debug('Plugins loaded!');
}

export type {
  PrefixFunction, PluginJSON, PluginFunction, Plugin,
};

export default loadPlugins;
