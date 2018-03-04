import { KarnaughMap } from '../app/auxiliary/karnaugh-map';
import {ExpressionGroup} from '../app/auxiliary/expression-group';

describe('Karnaugh Map', () => {

  it('should convert map to ExpressionGroup', () => {
    let marked = [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    let expected = new ExpressionGroup(false, false, null, null);
    const result = (new KarnaughMap()).mapToExpression(marked);
    expect(result).toEqual(expected);

  });

  it('should throw an error on invalid map', () => {
    let marked = [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ];
    let kmap = new KarnaughMap();
    expect(function() {kmap.mapToExpression(marked); }).toThrow();

  });

});
