import {ExpressionGroup} from './expression-group';
import {AppComponent} from '../app.component';
import {async, TestBed} from '@angular/core/testing';

describe('Expression Group', () => {

  beforeEach(async(() => {
  }));

  it('should find minimal 1', () => {
    let allGroups = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(true, true, null, null),
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null),
      new ExpressionGroup(null, false, false, null),
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

    const result = ExpressionGroup.findMinimal(allGroups);
    expect(result).toContain(expected1);
    expect(result).toContain(expected2);
    expect(result.length).toEqual(2);
  });

  it('should find minimal 2', () => {
    let allGroups = [
      new ExpressionGroup(false, null, false, null),
      new ExpressionGroup(false, true, null, true),
      new ExpressionGroup(null, true, true, true),
      new ExpressionGroup(true, null, true, true),
      new ExpressionGroup(true, false, true, null),
    ];

    let expected1 = [
      new ExpressionGroup(false, null, false, null),
      new ExpressionGroup(null, true, true, true),
      new ExpressionGroup(true, false, true, null)
    ];

    const result = ExpressionGroup.findMinimal(allGroups);
    expect(result).toContain(expected1);
    expect(result.length).toEqual(1);
  });

  it('should find minimal 3', () => {
    let allGroups = [
      new ExpressionGroup(false, true, null, null),
      new ExpressionGroup(false, null, false, null),
      new ExpressionGroup(true, false, true, null),
      new ExpressionGroup(null, true, true, true),
      new ExpressionGroup(true, null, true, true)
    ];

    let expected1 = [
      new ExpressionGroup(false, true, null, null),
      new ExpressionGroup(false, null, false, null),
      new ExpressionGroup(true, false, true, null),
      new ExpressionGroup(null, true, true, true)
    ];

    let expected2 = [
      new ExpressionGroup(false, true, null, null),
      new ExpressionGroup(false, null, false, null),
      new ExpressionGroup(true, false, true, null),
      new ExpressionGroup(true, null, true, true)
    ];

    const result = ExpressionGroup.findMinimal(allGroups);
    expect(result).toContain(expected1);
    expect(result).toContain(expected2);
    expect(result.length).toEqual(2);
  });

  it('should get the smallest unique groups', () => {

    let group1 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(true, true, null, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null),
    ];

    let group2 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    let group3 = [
      new ExpressionGroup(null, false, false, null),
      new ExpressionGroup(false, null, true, null),
      new ExpressionGroup(true, true, null, null)
    ];

    let group4 = [
      new ExpressionGroup(false, false, null, null),
      new ExpressionGroup(null, true, true, null),
      new ExpressionGroup(true, null, false, null)
    ];

    const result = ExpressionGroup.getSmallestUnique([group1, group2, group3, group4]);
    expect(result).toContain(group2);
    expect(result).toContain(group3);
    expect(result.length).toEqual(2);

  });

});
