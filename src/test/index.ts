import '../../bld/library';

// eslint-disable-next-line @mufan/import-path-be-smart,@mufan/import-groups
import {testPrint} from './@other';

if (!testPrint()) {
  throw Error('test case failed');
}
