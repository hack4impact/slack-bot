import { promises as fs } from 'fs';
import { join } from 'path';
import _debug from 'debug';

const debug = _debug('plugins');

/**
 * A handy function that prefixes any ID string you
 * give it with your plugin's slug
 */
// type PrefixFunction = (id) => string;

/**
 * The JSON metadata file for your plugin
 */
// interface PluginJSON {
//   name: string,
//   version: string,
//   slug: string,
// }

// type PluginFunction = (app:App, pre:PrefixFunction) => Promise<void>;

// interface Plugin {
//   json: PluginJSON,
//   func: PluginFunction
// }

// Some JavaScript wizardy that dynamically loads plugins
async function loadPlugins(app) {
  debug('Loading plugins...');

  // load the plugin files
  const loadPromises = [];
  const pluginFolders = await fs.readdir(join(__dirname, '..', 'plugins'));
  for (let i = 0; i < pluginFolders.length; i += 1) {
    const pluginPath = `../plugins/${pluginFolders[i]}`;
    loadPromises.push((async () => {
      const json = JSON.parse((await fs.readFile(join(__dirname, pluginPath, 'plugin.json'))).toString());
      const func = (await import(`${pluginPath}/plugin`)).default;
      return { json, func };
    })());
  }

  // register each plugin
  const pluginPromises = [];
  const plugins = await Promise.all(loadPromises);
  debug(`${plugins.length} plugins detected.`);
  for (let i = 0; i < plugins.length; i += 1) {
    const plugin = plugins[i];
    const pre = (id) => `${plugin.json.slug}_${id}`;
    pluginPromises.push(plugin.func(app, pre).then(() => {
      debug(`→ "${plugin.json.name}" v${plugin.json.version} loaded.`);
    }));
  }
  await Promise.all(pluginPromises);
  debug('Plugins loaded!');
}

export default loadPlugins;
