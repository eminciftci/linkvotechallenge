import { sortAscending, sortDescending, addTopOfList, voteUpSorting, voteDownSorting } from '../util/Util'
import { VALIDATION_RULES } from "../constants/AppConstants";

//sorting tests

it('sort ascending ', () => {
    expect(sortAscending([{points: 2},{points: 1}])).toEqual([{points: 1},{points: 2}]);

});

it('sort ascending equal ', () => {
    expect(sortAscending([{points: 5},{points: 5}])).toEqual([{points: 5},{points: 5}]);

});

//failed
it('sort ascending not ', () => {
    expect(sortAscending([{points: 1},{points: 2}])).toEqual([{points: 2},{points: 1}]);

});

it('sort descending ', () => {
    expect(sortDescending([{points: 1},{points: 2}])).toEqual([{points: 2},{points: 1}]);

});

//failed
it('sort descending not', () => {
    expect(sortDescending([{points: 2},{points: 1}])).toEqual([{points: 1},{points: 2}]);

});

//regexp tests

//failed
it ('link name must be alphabetic', () => {
    let rule = VALIDATION_RULES.link_name_rules[0].pattern;
    expect("This is not suitable for alphabetic").toMatch(rule);
})

it ('link name must be alphabetic', () => {
    let rule = VALIDATION_RULES.link_name_rules[0].pattern;
    expect("ThisIsSuitableForAlphabetic").toMatch(rule);
})

//failed
it ('max length is 50', () => {
    let max = VALIDATION_RULES.link_name_rules[1].max;
    expect("This sentence's length is greater than 50. So it is not valid.".length).toBeLessThan(max);
})

// add to list test

it ('add top of list', () => {
    let list = [1,2,3];
    let object = 4;
    let result = [4,1,2,3];
    expect(addTopOfList(object, list)).toStrictEqual(result);
})

it ('add top of list', () => {
    let list = [];
    let object = 0;
    let result = [0];
    expect(addTopOfList(object, list)).toStrictEqual(result);
})


//failed
it ('add top of list not true', () => {
    let list = [1,2,3];
    let object = 4;
    let result = [1,2,3,4];
    expect(addTopOfList(object, list)).toStrictEqual(result);
})

//voting functions

it ('vote up', () => {
    let list = [{points: 2}, {points: 2}, {points: 3}];
    let index = 2;
    let result = [{points: 4}, {points: 2}, {points: 2}];
    expect(voteUpSorting(list, index)).toStrictEqual(result);
})

it ('vote down', () => {
    let list = [{points: 2}, {points: 2}, {points: 3}];
    let index = 0;
    let result = [{points: 2}, {points: 3}, {points: 1}];
    expect(voteDownSorting(list, index)).toStrictEqual(result);
})