#!/usr/bin/env zx
import 'zx/globals'
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

$.verbose = true

const containerName = 'test-container'

async function run() {
  const p = $`docker exec ${containerName} sh /install.sh`
  await p.nothrow()
  return await p.text()
}

describe('install.sh', async () => {

  beforeEach(async () => {
    await $`vagrant up`.nothrow()
    await $`vagrant upload build.sh /tmp/build.sh`.nothrow()
  });

  afterEach(async () => {
    await $`vagrant destroy -f`.nothrow()
  });

  // it('wget and curl are not available', async () => {
  //   assert.match(await run(), /Neither wget nor curl is installed/);
  // });

  it('wget is intalled, curl is not installed', async () => {
    await $`vagrant ssh -c "pwd"`.nothrow()
    await $`vagrant ssh -c "ls"`.nothrow()
    await $`vagrant ssh -c "curl"`.nothrow()
    await $`vagrant ssh -c "wget"`.nothrow()
    await $`vagrant ssh -c "cat /tmp/build.sh"`.nothrow()
    // assert.match(await run(), /frps and frpc are installed/);
  });
});


