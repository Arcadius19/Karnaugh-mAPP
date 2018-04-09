import { BestGroupsSolver } from '../app/auxiliary/best-groups-solver';
import {ExpressionGroup} from '../app/auxiliary/expression-group';

describe('Best Group Solver', () => {

  it('should find the best groups - multiple options', () => {
    let marked = [
      [1, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 0]
    ];

    let expected1 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    let expected2 = [
      new ExpressionGroup(true, true, null, null),
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(null, false, false, null),
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected1);
    expect(result).toContain(expected2);
    expect(result.length).toEqual(2);
  });

  it('should find the best groups - not A or not C', () => {
    let marked = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 0]
    ];

    let expected = [
      new ExpressionGroup(false, null, null, null),
      new ExpressionGroup(null, null, false, null)
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected);
    expect(result.length).toEqual(1);
  });

  it('should find the best groups - complex', () => {
    let marked = [
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 0]
    ];

    let expected1 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(null, null, false, false),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    let expected2 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(false, null, null, false),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    let expected3 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(null, true, null, false),
      new ExpressionGroup(true, null, false, null)
    ];

    let expected4 = [
      new ExpressionGroup(true, true, null, null),
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(null, true, null, false),
      new ExpressionGroup(null, false, false, null)
    ];

    let expected5 = [
      new ExpressionGroup(true, true, null, null),
      new ExpressionGroup(null, null, false, false),
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(null, false, false, null)
    ];

    let expected6 = [
      new ExpressionGroup(true, true, null, null),
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(false, null, null, false),
      new ExpressionGroup(null, false, false, null)
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected1);
    expect(result).toContain(expected2);
    expect(result).toContain(expected3);
    expect(result).toContain(expected4);
    expect(result).toContain(expected5);
    expect(result).toContain(expected6);
    expect(result.length).toEqual(6);
  });

  it('should find the best groups - basic', () => {
    let marked = [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 0]
    ];

    let expected = [
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected);
    expect(result.length).toEqual(1);
  });

  it('should find the best groups - not include resolution', () => {
    let marked = [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 0]
    ];

    let expected = [
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    const result = BestGroupsSolver.findBestGroups(marked);
    expect(result).toContain(expected);
    expect(result.length).toEqual(1);
  });

  it('should find the sum of groups', () => {
    let group1 = [
      [0, 0, 1, 0],
      [1, 1, 0, 1],
      [0, 1, 0, 1]
    ];

    let group2 = [
      [1, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 0, 1]
    ];

    let expected = [
      [1, 0, 1, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 1]
    ];

    const result = BestGroupsSolver.sumGroups(group1, group2);
    expect(result).toEqual(expected);
  });

  it('should find the sum of groups 2', () => {
    let group1 = [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
    ];

    let group2 = [
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
    ];

    let group3 = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    let expected = [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 1],
      [1, 1, 0, 1],
    ];

    const result = BestGroupsSolver.sumGroups(group1, group2, group3);
    expect(result).toEqual(expected);
  });

});
