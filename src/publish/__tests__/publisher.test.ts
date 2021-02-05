import Publisher from '../publisher';
import * as core from '@actions/core';
import flushPromises from '../../__tests__/flush-promises';
import fetch from 'node-fetch';

const published = '__tests__/fixtures/articles/published.md';
const unpublished = '__tests__/fixtures/articles/not-published.md';

console.log = jest.fn();
console.warn = jest.fn();
console.table = jest.fn();

test('sets constructor attrs when configured', () => {
  const instance = new Publisher(published, 'configured-publisher');

  expect(instance.token).toEqual('publisher-default-token');
  expect(instance.data.title).toEqual('Published Article');
  expect(instance.data.published).toEqual(true);
  expect(instance.data.description).toEqual('This article is publishable');
  expect(instance.data.tags).toEqual('javascript, vue, github');
  expect(instance.markdown).not.toEqual('not-configured');
  expect(instance.content).not.toEqual(null);
});

test('does NOT sets constructor attrs when not configured configured', () => {
  const instance = new Publisher(published, 'invalid-publisher-key');

  expect(instance.token).toEqual('');
  expect(instance.data).toEqual(null);
  expect(instance.markdown).toEqual('not-configured');
  expect(instance.content).toEqual(null);
  expect(core.info).toHaveBeenCalledWith('Not configured');
});

test('publish will warn _publish should be configured in the child class', async () => {
  const instance = new Publisher(published, 'configured-publisher');
  instance.publish();
  await flushPromises();
  expect(console.warn).toHaveBeenCalledWith('Child class should implement.');
  expect(console.table).toHaveBeenCalledWith({
    title: 'Published Article',
    destination: 'Publisher',
    status: 500,
    slug: undefined,
    id: undefined,
  });
});

test('it does not publish unpublished article', async () => {
  const instance = new Publisher(unpublished, 'configured-publisher');
  instance.publish();
  await flushPromises();
  expect(console.log).toHaveBeenCalledWith(`Article Unpublished Article NOT published. Skipping.`);
});
