import { BestGroupsSolver } from '../app/auxiliary/best-groups-solver';
import {ExpressionGroup} from '../app/auxiliary/expression-group';

describe('Best Group Solver', () => {

  it('should find the best groups 1', () => {
    let marked = [
      [1, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 0]
    ];

    let expected = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, false, false, null)
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected[0]);
    expect(result).toContain(expected[1]);
    expect(result).toContain(expected[2]);
    expect(result.length).toEqual(expected.length);
  });

  it('should find the best groups 2', () => {
    let marked = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 0]
    ];

    let expected = [
      new ExpressionGroup(null, null, false, null),
      new ExpressionGroup(false, null, null, null)
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected[0]);
    expect(result).toContain(expected[1]);
    expect(result.length).toEqual(expected.length);
  });

});
