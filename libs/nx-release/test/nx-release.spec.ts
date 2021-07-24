import { nxRelease } from '../src/nx-release';

describe('nxRelease', () => {
  it('should work', () => {
    expect(nxRelease()).toEqual('nx-release');
  });
});
