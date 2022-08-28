import { XNATE_CONFIG } from './../shared/constant';
import { merge } from 'lodash';

import { logger } from '../shared/log';
import chokidar, { FSWatcher } from 'chokidar';
import { createServer, ViteDevServer } from 'vite';
import { ensureDirSync, pathExistsSync } from 'fs-extra';

import { SRC_DIR } from '../shared/constant';
import { compileSite } from '../compiler/compilerSite';
import { resolveXnateConfig } from '../config/xnate.config';
import { getDevConfig } from './../config/vite.config';

let server: ViteDevServer;
let watchers: FSWatcher;

async function startServer(force: boolean = true) {
  const isRestart = Boolean(server);

  logger.info(`${isRestart ? 'Res' : 'S'}tarting server...`);

  server && (await server.close());
  watchers && (await watchers.close());

  //
  await compileSite();
  const xnateConfig = resolveXnateConfig();
  const viteDevConfig = getDevConfig(xnateConfig);
  const inlineConfig = merge(viteDevConfig, force ? { server: true } : {});

  server = await createServer(inlineConfig);
  await server.listen();
  server.printUrls();

  if (pathExistsSync(XNATE_CONFIG)) {
    watchers = chokidar.watch(XNATE_CONFIG);
    watchers.on('change', () => startServer(force));
  }

  logger.info(`${isRestart ? 'Res' : 'S'}tart successfully!!!`);
}

export async function devUi() {
  process.env.NODE_ENV === 'development';

  console.log(SRC_DIR, 'SRC_DIR');
  ensureDirSync(SRC_DIR);

  await startServer();
}
