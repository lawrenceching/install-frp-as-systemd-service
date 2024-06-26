#!/usr/bin/env zx
import 'zx/globals'
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

$.verbose = true

describe('install.sh', async () => {

  beforeEach(async () => {
    await $`vagrant up`
    await $`vagrant upload install.sh /tmp/install.sh`
    await $`vagrant ssh -c "cat /tmp/install.sh"`
    // await $`vagrant ssh -c "whoami"`
    // await $`vagrant ssh -c "pwd"`
  });

  afterEach(async () => {
    await $`vagrant destroy -f`
  });

  it('install successfully', async () => {
    const stdout = await $`vagrant ssh -c "sudo bash /tmp/install.sh"`.nothrow().text()
    assert.match(stdout, /frps and frpc are installed/)
  });
  //
  // it('curl is installed, wget is not installed', async () => {
  //   await $`vagrant ssh -c "sudo apt-get remove wget -y"`
  //   const stdout = await $`vagrant ssh -c "sudo bash /tmp/install.sh"`.nothrow().text()
  //   assert.match(stdout, /frps and frpc are installed/)
  // });
  //
  // it('Neither wget nor curl is installed', async () => {
  //   await $`vagrant ssh -c "sudo apt-get remove wget curl -y"`
  //   const stdout = await $`vagrant ssh -c "sudo bash /tmp/install.sh"`.nothrow().text()
  //   assert.match(stdout, /Neither wget nor curl is installed/)
  // });

});


